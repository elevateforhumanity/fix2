resource "aws_elasticache_subnet_group" "efh_redis_subnets" {
  name       = "efh-redis-subnets"
  subnet_ids = var.redis_subnet_ids

  tags = {
    Name        = "EFH Redis Subnet Group"
    Environment = var.environment
    Project     = "elevate-for-humanity"
  }
}

resource "aws_elasticache_replication_group" "efh_redis" {
  replication_group_id       = "efh-redis-${var.environment}"
  replication_group_description = "Redis cluster for Elevate for Humanity LMS"
  
  engine               = "redis"
  engine_version       = "7.1"
  node_type            = var.redis_node_type
  num_cache_clusters   = var.redis_num_nodes
  parameter_group_name = "default.redis7"
  port                 = 6379

  subnet_group_name    = aws_elasticache_subnet_group.efh_redis_subnets.name
  security_group_ids   = [var.redis_security_group_id]

  automatic_failover_enabled = var.redis_num_nodes > 1
  multi_az_enabled          = var.redis_num_nodes > 1

  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  auth_token_enabled        = true
  auth_token                = var.redis_auth_token

  snapshot_retention_limit = 5
  snapshot_window         = "03:00-05:00"
  maintenance_window      = "mon:05:00-mon:07:00"

  log_delivery_configuration {
    destination      = aws_cloudwatch_log_group.redis_slow_log.name
    destination_type = "cloudwatch-logs"
    log_format       = "json"
    log_type         = "slow-log"
  }

  tags = {
    Name        = "EFH Redis Cluster"
    Environment = var.environment
    Project     = "elevate-for-humanity"
  }
}

resource "aws_cloudwatch_log_group" "redis_slow_log" {
  name              = "/aws/elasticache/efh-redis-${var.environment}/slow-log"
  retention_in_days = 7

  tags = {
    Name        = "EFH Redis Slow Log"
    Environment = var.environment
    Project     = "elevate-for-humanity"
  }
}

output "redis_endpoint" {
  value       = aws_elasticache_replication_group.efh_redis.primary_endpoint_address
  description = "Redis primary endpoint"
}

output "redis_port" {
  value       = aws_elasticache_replication_group.efh_redis.port
  description = "Redis port"
}
