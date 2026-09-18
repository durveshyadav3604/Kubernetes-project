#!/bin/bash
set -e

echo "��� Starting Terraform Deployment..."

cd terraform/main

terraform init
terraform validate
terraform plan -out=tfplan
terraform apply -auto-approve tfplan

echo "✅ Terraform deployment completed successfully."
