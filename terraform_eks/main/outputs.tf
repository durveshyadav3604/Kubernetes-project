output "cluster_name" {
  value = module.eks.cluster_name
}
output "cluster_endpoint" {
  value = module.eks.cluster_endpoint
}
output "configure_kubectl" {
  description = "Run this to point kubectl at the new cluster"
  value       = "aws eks update-kubeconfig --region ${var.region} --name ${module.eks.cluster_name}"
}
output "oidc_provider_arn" {
  value = module.eks.oidc_provider_arn
}
output "alb_controller_role_arn" {
  description = "Pass to the AWS Load Balancer Controller Helm install (see README)"
  value       = module.eks.alb_controller_role_arn
}
output "ebs_csi_role_arn" {
  value = module.eks.ebs_csi_role_arn
}
output "vpc_id" {
  value = module.vpc.vpc_id
}
output "backend_ecr_repository_url" {
  value = module.ecr.backend_repository_url
}
output "frontend_ecr_repository_url" {
  value = module.ecr.frontend_repository_url
}
output "bastion_public_ip" {
  value = module.bastion.bastion_public_ip
}
output "bastion_ssh_command" {
  description = "Only works if bastion_key_name was set - otherwise use SSM (see aws_ssm_command output)"
  value       = "ssh -i <your-key>.pem ec2-user@${module.bastion.bastion_public_ip}"
}
output "bastion_ssm_command" {
  value = "aws ssm start-session --target ${module.bastion.bastion_instance_id} --region ${var.region}"
}
output "external_secrets_role_arn" {
  description = "Pass this to the External Secrets Operator's ServiceAccount annotation (eks.amazonaws.com/role-arn)"
  value       = aws_iam_role.external_secrets.arn
}
