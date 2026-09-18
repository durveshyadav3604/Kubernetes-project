variable "project_name" {
  type = string
}
variable "cluster_name" {
  description = "Used only for the kubernetes.io/cluster/<name> subnet tags EKS and the AWS Load Balancer Controller need for auto-discovery"
  type        = string
}
variable "vpc_cidr" {
  type = string
}
variable "public_subnet_cidrs" {
  type = list(string)
}
variable "private_subnet_cidrs" {
  type = list(string)
}
