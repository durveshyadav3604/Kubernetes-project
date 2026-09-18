variable "project_name" { type = string }
variable "cluster_name" { type = string }
variable "kubernetes_version" {
  type    = string
  default = "1.31"
}
variable "private_subnet_ids" { type = list(string) }
variable "public_subnet_ids" { type = list(string) }

variable "admin_principal_arn" {
  description = "IAM principal (user or role ARN) granted EKS cluster-admin via an access entry - typically the ARN of whoever/whatever runs terraform apply"
  type        = string
}

variable "bastion_admin_principal_arn" {
  description = "Bastion's IAM role ARN, also granted an EKS access entry so kubectl works once you SSH in"
  type        = string
}

variable "bastion_security_group_id" {
  description = "Bastion's security group ID, allowed into the cluster security group for kubectl (443) and node SSH (22)"
  type        = string
}

variable "cluster_endpoint_public_access" {
  description = "false = API server only reachable from inside the VPC (i.e. via the bastion). Recommended once a bastion exists."
  type        = bool
  default     = false
}

variable "cluster_public_access_cidrs" {
  description = "Only used if cluster_endpoint_public_access = true"
  type        = list(string)
  default     = []
}

variable "node_instance_types" {
  type    = list(string)
  default = ["t3.medium"]
}
variable "node_capacity_type" {
  description = "ON_DEMAND or SPOT"
  type        = string
  default     = "ON_DEMAND"
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
variable "external_secrets_namespace" {
  description = "Kubernetes namespace where the External Secrets Operator's ServiceAccount lives"
  type        = string
  default     = "bags-luggage"
}

variable "external_secrets_service_account_name" {
  description = "Name of the ServiceAccount External Secrets Operator uses (must match the ServiceAccount you create/annotate in Kubernetes)"
  type        = string
  default     = "external-secrets-sa"
}

variable "external_secrets_secret_path" {
  description = "Secrets Manager name/path prefix ESO is allowed to read, e.g. \"bags-luggage/\". A trailing \"*\" is appended automatically so it covers versions/suffixes."
  type        = string
}