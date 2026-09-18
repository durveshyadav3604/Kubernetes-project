variable "project_name" { type = string }
variable "vpc_id" { type = string }
variable "public_subnet_id" { type = string }
variable "cluster_name" { type = string }
variable "region" { type = string }

variable "allowed_ssh_cidr" {
  description = "CIDR allowed to SSH into the bastion, e.g. \"203.0.113.4/32\" - never leave this as 0.0.0.0/0"
  type        = string
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}
variable "key_name" {
  description = "EC2 key pair name for SSH. Leave empty to rely on SSM Session Manager only."
  type        = string
  default     = ""
}
variable "kubectl_version" {
  type    = string
  default = "v1.31.0"
}
