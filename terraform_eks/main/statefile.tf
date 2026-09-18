terraform {
  backend "s3" {
    bucket       = "github-terraform-bucket-durvesh-272"
    key          = "prod/eks/terraform.tfstate"
    region       = "ap-south-1"
    use_lockfile = true
    encrypt      = true
  }
}
