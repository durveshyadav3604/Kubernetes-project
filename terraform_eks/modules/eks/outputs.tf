output "cluster_name" {
  value = aws_eks_cluster.this.name
}
output "cluster_endpoint" {
  value = aws_eks_cluster.this.endpoint
}
output "cluster_certificate_authority_data" {
  value = aws_eks_cluster.this.certificate_authority[0].data
}
output "cluster_security_group_id" {
  value = aws_eks_cluster.this.vpc_config[0].cluster_security_group_id
}
output "oidc_provider_arn" {
  value = aws_iam_openid_connect_provider.eks.arn
}
output "node_role_arn" {
  value = aws_iam_role.node.arn
}
output "ebs_csi_role_arn" {
  value = aws_iam_role.ebs_csi.arn
}
output "alb_controller_role_arn" {
  description = "Pass this to the AWS Load Balancer Controller Helm chart's serviceAccount.annotations"
  value       = aws_iam_role.alb_controller.arn
}
output "external_secrets_role_arn" {
  description = "Pass this to the External Secrets Operator's ServiceAccount annotation (eks.amazonaws.com/role-arn)"
  value       = aws_iam_role.external_secrets.arn
}