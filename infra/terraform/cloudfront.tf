resource "aws_cloudfront_origin_access_identity" "efh_oai" {
  comment = "OAI for EFH assets bucket"
}

resource "aws_cloudfront_distribution" "efh_cdn" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "EFH Assets CDN"
  default_root_object = "index.html"
  price_class         = var.cloudfront_price_class

  origin {
    domain_name = aws_s3_bucket.efh_assets.bucket_regional_domain_name
    origin_id   = "efh-assets-origin"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.efh_oai.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "efh-assets-origin"

    forwarded_values {
      query_string = false
      headers      = ["Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"]

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  # Cache behavior for images
  ordered_cache_behavior {
    path_pattern     = "/images/*"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "efh-assets-origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
  }

  # Cache behavior for videos
  ordered_cache_behavior {
    path_pattern     = "/videos/*"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "efh-assets-origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = false
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = var.cloudfront_custom_domain == "" ? true : false
    acm_certificate_arn           = var.cloudfront_custom_domain != "" ? var.cloudfront_acm_cert_arn : null
    ssl_support_method            = var.cloudfront_custom_domain != "" ? "sni-only" : null
    minimum_protocol_version      = "TLSv1.2_2021"
  }

  dynamic "aliases" {
    for_each = var.cloudfront_custom_domain != "" ? [var.cloudfront_custom_domain] : []
    content {
      aliases = [aliases.value]
    }
  }

  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.efh_cloudfront_logs.bucket_domain_name
    prefix          = "cdn/"
  }

  tags = {
    Name        = "EFH CDN Distribution"
    Environment = var.environment
    Project     = "elevate-for-humanity"
  }
}

resource "aws_s3_bucket" "efh_cloudfront_logs" {
  bucket = "efh-cloudfront-logs-${var.environment}"

  tags = {
    Name        = "EFH CloudFront Logs"
    Environment = var.environment
    Project     = "elevate-for-humanity"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "efh_cloudfront_logs_lifecycle" {
  bucket = aws_s3_bucket.efh_cloudfront_logs.id

  rule {
    id     = "delete-old-logs"
    status = "Enabled"

    expiration {
      days = 90
    }
  }
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.efh_cdn.id
  description = "CloudFront distribution ID"
}

output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.efh_cdn.domain_name
  description = "CloudFront distribution domain name"
}
