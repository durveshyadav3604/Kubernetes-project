#!/bin/bash
set -e

echo "🔥 Starting Terraform Destroy..."

cd "$(dirname "$0")/../terraform/main"

terraform init
terraform destroy -auto-approve -lock=false

echo "✅ Terraform destroy completed successfully."