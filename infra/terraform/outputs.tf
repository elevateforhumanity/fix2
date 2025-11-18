# infra/terraform/outputs.tf

output "db_endpoint" {
  description = "RDS PostgreSQL endpoint"
  value       = module.db.db_instance_endpoint
}

output "redis_endpoint" {
  description = "ElastiCache Redis endpoint"
  value       = aws_elasticache_cluster.redis.cache_nodes[0].address
}

output "assets_bucket" {
  description = "S3 assets bucket name"
  value       = aws_s3_bucket.assets.bucket
}

output "backups_bucket" {
  description = "S3 backups bucket name"
  value       = aws_s3_bucket.backups.bucket
}

output "cdn_domain" {
  description = "CloudFront CDN domain"
  value       = aws_cloudfront_distribution.assets.domain_name
}

output "vpc_id" {
  description = "VPC ID"
  value       = module.network.vpc_id
}
