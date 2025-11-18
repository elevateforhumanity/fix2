# infra/terraform/variables.tf

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "db_username" {
  description = "DB master username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "DB master password"
  type        = string
  sensitive   = true
}

variable "environment" {
  description = "Environment name (prod, staging, dev)"
  type        = string
  default     = "prod"
}
