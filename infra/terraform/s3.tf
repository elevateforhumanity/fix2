resource "aws_s3_bucket" "efh_assets" {
  bucket = "efh-assets-${var.environment}"

  tags = {
    Name        = "EFH Assets Bucket"
    Environment = var.environment
    Project     = "elevate-for-humanity"
  }
}

resource "aws_s3_bucket_versioning" "efh_assets_versioning" {
  bucket = aws_s3_bucket.efh_assets.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "efh_assets_encryption" {
  bucket = aws_s3_bucket.efh_assets.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = var.s3_kms_key_id
    }
  }
}

resource "aws_s3_bucket_public_access_block" "efh_assets_block" {
  bucket = aws_s3_bucket.efh_assets.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_lifecycle_configuration" "efh_assets_lifecycle" {
  bucket = aws_s3_bucket.efh_assets.id

  rule {
    id     = "archive-old-versions"
    status = "Enabled"

    noncurrent_version_transition {
      noncurrent_days = 30
      storage_class   = "STANDARD_IA"
    }

    noncurrent_version_transition {
      noncurrent_days = 90
      storage_class   = "GLACIER"
    }

    noncurrent_version_expiration {
      noncurrent_days = 365
    }
  }

  rule {
    id     = "delete-incomplete-uploads"
    status = "Enabled"

    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
  }
}

resource "aws_s3_bucket_cors_configuration" "efh_assets_cors" {
  bucket = aws_s3_bucket.efh_assets.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["https://elevateconnectsdirectory.org", "https://*.elevateconnectsdirectory.org"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

output "s3_bucket_name" {
  value       = aws_s3_bucket.efh_assets.id
  description = "S3 bucket name for assets"
}

output "s3_bucket_arn" {
  value       = aws_s3_bucket.efh_assets.arn
  description = "S3 bucket ARN"
}
