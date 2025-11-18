# infra/terraform/main.tf
# Terraform configuration for Elevate for Humanity infrastructure

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "efh-terraform-state"
    key    = "envs/prod/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC and Networking
module "network" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.5.2"

  name = "efh-prod-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

  tags = {
    Project = "ElevateForHumanity"
    Env     = "prod"
  }
}

# RDS PostgreSQL Database
module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "6.5.3"

  identifier = "efh-prod-db"

  engine               = "postgres"
  engine_version       = "15.5"
  instance_class       = "db.t3.medium"
  allocated_storage    = 100
  max_allocated_storage = 500

  db_name  = "efh_prod"
  username = var.db_username
  password = var.db_password

  multi_az               = true
  storage_encrypted      = true
  deletion_protection    = true
  skip_final_snapshot    = false
  backup_retention_period = 7

  vpc_security_group_ids = [module.db_sg.security_group_id]
  db_subnet_group_name   = module.network.database_subnet_group_name

  tags = {
    Project = "ElevateForHumanity"
    Env     = "prod"
  }
}

# Database Security Group
module "db_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "5.1.0"

  name        = "efh-prod-db-sg"
  description = "Security group for EFH Postgres"
  vpc_id      = module.network.vpc_id

  ingress_with_cidr_blocks = [
    {
      from_port   = 5432
      to_port     = 5432
      protocol    = "tcp"
      cidr_blocks = "10.0.0.0/16" # only from inside VPC
    }
  ]

  egress_with_cidr_blocks = [
    {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = "0.0.0.0/0"
    }
  ]
}

# ElastiCache Redis
resource "aws_elasticache_subnet_group" "redis" {
  name       = "efh-redis-subnets"
  subnet_ids = module.network.private_subnets
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "efh-prod-redis"
  engine               = "redis"
  engine_version       = "7.1"
  node_type            = "cache.t3.small"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.redis.name
  security_group_ids   = [module.redis_sg.security_group_id]

  tags = {
    Project = "ElevateForHumanity"
    Env     = "prod"
  }
}

# Redis Security Group
module "redis_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "5.1.0"

  name        = "efh-prod-redis-sg"
  description = "Security group for EFH Redis"
  vpc_id      = module.network.vpc_id

  ingress_with_cidr_blocks = [
    {
      from_port   = 6379
      to_port     = 6379
      protocol    = "tcp"
      cidr_blocks = "10.0.0.0/16"
    }
  ]

  egress_with_cidr_blocks = [
    {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = "0.0.0.0/0"
    }
  ]
}

# S3 Buckets
resource "aws_s3_bucket" "assets" {
  bucket = "efh-prod-assets"

  tags = {
    Project = "ElevateForHumanity"
    Env     = "prod"
  }
}

resource "aws_s3_bucket_versioning" "assets" {
  bucket = aws_s3_bucket.assets.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket" "backups" {
  bucket = "efh-prod-backups"

  tags = {
    Project = "ElevateForHumanity"
    Env     = "prod"
  }
}

resource "aws_s3_bucket_versioning" "backups" {
  bucket = aws_s3_bucket.backups.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "backups" {
  bucket = aws_s3_bucket.backups.id

  rule {
    id     = "delete-old-backups"
    status = "Enabled"

    expiration {
      days = 90
    }
  }
}

# CloudFront CDN for assets
resource "aws_cloudfront_distribution" "assets" {
  enabled = true
  comment = "EFH Assets CDN"

  origin {
    domain_name = aws_s3_bucket.assets.bucket_regional_domain_name
    origin_id   = "S3-efh-assets"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.assets.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-efh-assets"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Project = "ElevateForHumanity"
    Env     = "prod"
  }
}

resource "aws_cloudfront_origin_access_identity" "assets" {
  comment = "EFH Assets OAI"
}
