# create vpc - public subnets (ALB/NAT) + private subnets (EKS nodes and pods)
module "vpc" {
  source               = "../modules/vpc"
  project_name         = var.project_name
  cluster_name         = var.cluster_name
  vpc_cidr             = var.vpc_cidr
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
}

# create ECR repositories for both images
module "ecr" {
  source                   = "../modules/ecr"
  project_name             = var.project_name
  backend_repository_name  = var.backend_repository_name
  frontend_repository_name = var.frontend_repository_name
  image_retention_count    = var.image_retention_count
}

# create the bastion first - its security group and IAM role are needed
# by the EKS module below to grant it network + kubectl access
module "bastion" {
  source = "../modules/bastion"

  project_name     = var.project_name
  vpc_id           = module.vpc.vpc_id
  public_subnet_id = module.vpc.public_subnet_ids[0]
  cluster_name     = var.cluster_name
  region           = var.region
  allowed_ssh_cidr = var.bastion_allowed_ssh_cidr
  instance_type    = var.bastion_instance_type
  key_name         = var.bastion_key_name
}

# create EKS cluster, managed node group, OIDC/IRSA, EBS CSI driver addon,
# the IAM role the AWS Load Balancer Controller will use, and the security
# group + access-entry wiring that lets the bastion reach it
module "eks" {
  source = "../modules/eks"

  project_name        = var.project_name
  cluster_name        = var.cluster_name
  kubernetes_version  = var.kubernetes_version
  private_subnet_ids  = module.vpc.private_subnet_ids
  public_subnet_ids   = module.vpc.public_subnet_ids
  admin_principal_arn = var.admin_principal_arn

  bastion_admin_principal_arn = module.bastion.bastion_role_arn
  bastion_security_group_id   = module.bastion.bastion_security_group_id

  cluster_endpoint_public_access = var.cluster_endpoint_public_access
  cluster_public_access_cidrs    = var.cluster_public_access_cidrs

  node_instance_types = var.node_instance_types
  node_capacity_type  = var.node_capacity_type
  node_disk_size      = var.node_disk_size
  node_min_size       = var.node_min_size
  node_max_size       = var.node_max_size
  node_desired_size   = var.node_desired_size

  log_retention_days = var.log_retention_days
    external_secrets_namespace            = var.external_secrets_namespace
  external_secrets_service_account_name = var.external_secrets_service_account_name
  external_secrets_secret_path          = var.external_secrets_secret_path
}
