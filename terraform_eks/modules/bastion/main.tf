# EC2 bastion in a public subnet. Its whole job is to be the one place
# SSH is open, and the one place that can reach the (private) EKS API
# endpoint, worker nodes, and pods - so nothing else needs public exposure.

data "aws_ssm_parameter" "ubuntu_ami" {
  name = "/aws/service/canonical/ubuntu/server/24.04/stable/current/amd64/hvm/ebs-gp3/ami-id"
}

resource "aws_security_group" "bastion" {
  name        = "${var.project_name}-bastion-sg"
  description = "Bastion host - SSH in from admin CIDR only, everything else out"
  vpc_id      = var.vpc_id

  ingress {
    description = "SSH from admin CIDR"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ssh_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project_name}-bastion-sg" }
}

resource "aws_iam_role" "bastion" {
  name = "${var.project_name}-bastion-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

# SSM Session Manager as a backup access path that needs no open port at all
resource "aws_iam_role_policy_attachment" "bastion_ssm" {
  role       = aws_iam_role.bastion.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

# Lets the bastion run `aws eks update-kubeconfig` and call the EKS API to
# discover cluster details. This is NOT the same as cluster access itself -
# actual kubectl authorization is granted separately via an EKS access
# entry for this role's ARN (see main/main.tf).
resource "aws_iam_role_policy" "bastion_eks_describe" {
  name = "${var.project_name}-bastion-eks-describe"
  role = aws_iam_role.bastion.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["eks:DescribeCluster", "eks:ListClusters"]
      Resource = "*"
    }]
  })
}

resource "aws_iam_instance_profile" "bastion" {
  name = "${var.project_name}-bastion-profile"
  role = aws_iam_role.bastion.name
}

resource "aws_instance" "bastion" {
  ami                    = data.aws_ssm_parameter.ubuntu_ami.value
  instance_type          = var.instance_type
  subnet_id              = var.public_subnet_id
  key_name               = var.key_name != "" ? var.key_name : null
  vpc_security_group_ids = [aws_security_group.bastion.id]
  iam_instance_profile   = aws_iam_instance_profile.bastion.name

  associate_public_ip_address = true

  metadata_options {
    http_tokens = "required" # IMDSv2 only
  }

  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true
  }

  user_data = <<-EOF
    #!/bin/bash
    set -eux
    cd /tmp

    export DEBIAN_FRONTEND=noninteractive
    apt-get update -y
    apt-get install -y unzip curl

    # AWS CLI v2
    curl -sf "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscliv2.zip
    unzip -q awscliv2.zip
    ./aws/install

    # kubectl
    curl -sf -LO "https://dl.k8s.io/release/${var.kubectl_version}/bin/linux/amd64/kubectl"
    install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

    # helm
    curl -sf https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

    # Preconfigure kubeconfig for ubuntu user so `kubectl` works on first login
    su - ubuntu -c "aws eks update-kubeconfig --region ${var.region} --name ${var.cluster_name}"
  EOF

  tags = { Name = "${var.project_name}-bastion" }
}
