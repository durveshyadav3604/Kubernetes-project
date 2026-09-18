variable "project_name" { type = string }
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
