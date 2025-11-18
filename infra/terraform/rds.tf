resource "aws_db_subnet_group" "efh_db_subnets" {
  name       = "efh-db-subnets"
  subnet_ids = var.db_subnet_ids

  tags = {
    Name        = "EFH Database Subnet Group"
    Environment = var.environment
    Project     = "elevate-for-humanity"
  }
}

resource "aws_db_instance" "efh_postgres" {
  identifier        = "efh-postgres-${var.environment}"
  engine            = "postgres"
  engine_version    = "15.4"
  instance_class    = var.db_instance_class
  allocated_storage = 100
  max_allocated_storage = 500

  db_name  = "efh_lms"
  username = var.db_username
  password = var.db_password

  db_subnet_group_name   = aws_db_subnet_group.efh_db_subnets.name
  vpc_security_group_ids = [var.db_security_group_id]

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "mon:04:00-mon:05:00"

  skip_final_snapshot       = var.environment != "production"
  final_snapshot_identifier = var.environment == "production" ? "efh-postgres-final-${formatdate("YYYY-MM-DD-hhmm", timestamp())}" : null

  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]
  
  performance_insights_enabled = true
  performance_insights_retention_period = 7

  storage_encrypted = true
  kms_key_id       = var.db_kms_key_id

  tags = {
    Name        = "EFH PostgreSQL Database"
    Environment = var.environment
    Project     = "elevate-for-humanity"
  }
}

output "db_endpoint" {
  value       = aws_db_instance.efh_postgres.endpoint
  description = "PostgreSQL database endpoint"
}

output "db_name" {
  value       = aws_db_instance.efh_postgres.db_name
  description = "PostgreSQL database name"
}
