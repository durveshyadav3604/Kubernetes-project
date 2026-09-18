variable "region" {
  type    = string
  default = "ap-south-1"
}
variable "project_name" {
  type    = string
  default = "awsinfra"
}
variable "environment" {
  type    = string
  default = "production"
}
variable "cluster_name" {
  type    = string
  default = "awsinfra-eks"
}
variable "kubernetes_version" {
  type    = string
  default = "1.31"
}

variable "admin_principal_arn" {
  description = "IAM user/role ARN that should get EKS cluster-admin access (usually whoever/whatever runs terraform apply). Get yours with: aws sts get-caller-identity"
  type        = string
}

variable "vpc_cidr" { type = string }
variable "public_subnet_cidrs" { type = list(string) }
variable "private_subnet_cidrs" { type = list(string) }

variable "backend_repository_name" {
  type    = string
  default = "luggage-bag-app"
}
variable "frontend_repository_name" {
  type    = string
  default = "luggage-bag-app-frontend"
}
variable "image_retention_count" {
  type    = number
  default = 15
}

variable "node_instance_types" {
  type    = list(string)
  default = ["t3.medium"]
}
variable "node_capacity_type" {
  type    = string
  default = "ON_DEMAND"
}
variable "node_disk_size" {
  type    = number
  default = 30
}
variable "node_min_size" {
  type    = number
  default = 2
}
variable "node_max_size" {
  type    = number
  default = 6
}
variable "node_desired_size" {
  type    = number
  default = 2
}
variable "log_retention_days" {
  type    = number
  default = 30
}

variable "bastion_allowed_ssh_cidr" {
  description = "Your IP, as a /32 CIDR, e.g. \"203.0.113.4/32\". Find it with: curl -s ifconfig.me. Never leave this as 0.0.0.0/0."
  type        = string
}
variable "bastion_instance_type" {
  type    = string
  default = "t3.micro"
}
variable "bastion_key_name" {
  description = "EC2 key pair name for SSH. Leave empty (\"\") to rely on SSM Session Manager only, which needs no open port."
  type        = string
  default     = ""
}

variable "cluster_endpoint_public_access" {
  description = "false = EKS API only reachable from inside the VPC, via the bastion. Recommended now that a bastion exists."
  type        = bool
  default     = false
}
variable "cluster_public_access_cidrs" {
  type    = list(string)
  default = []
}
variable "external_secrets_namespace" {
  description = "Kubernetes namespace where the External Secrets Operator's ServiceAccount lives"
  type        = string
  default     = "bags-luggage"
}
variable "external_secrets_service_account_name" {
  description = "Name of the ServiceAccount External Secrets Operator uses"
  type        = string
  default     = "external-secrets-sa"
}
variable "external_secrets_secret_path" {
  description = "Secrets Manager name/path prefix ESO is allowed to read, e.g. \"bags-luggage/\". A trailing \"*\" is appended automatically."
  type        = string
}
