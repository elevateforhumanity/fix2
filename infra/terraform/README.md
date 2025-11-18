# Terraform Infrastructure

This directory contains Terraform configuration for Elevate for Humanity infrastructure.

## Prerequisites

- Terraform >= 1.5.0
- AWS CLI configured with appropriate credentials
- S3 bucket for Terraform state (`efh-terraform-state`)

## Resources Created

- **VPC**: 10.0.0.0/16 with public and private subnets across 2 AZs
- **RDS PostgreSQL**: Multi-AZ, encrypted, with automated backups
- **ElastiCache Redis**: For caching and rate limiting
- **S3 Buckets**: Assets and backups with versioning
- **CloudFront CDN**: For asset delivery

## Usage

### Initialize Terraform

```bash
cd infra/terraform
terraform init
```

### Plan Changes

```bash
terraform plan \
  -var="db_username=admin" \
  -var="db_password=your-secure-password"
```

### Apply Configuration

```bash
terraform apply \
  -var="db_username=admin" \
  -var="db_password=your-secure-password"
```

### Destroy Infrastructure

```bash
terraform destroy \
  -var="db_username=admin" \
  -var="db_password=your-secure-password"
```

## Environment Variables

Create a `terraform.tfvars` file (DO NOT commit):

```hcl
aws_region  = "us-east-1"
db_username = "admin"
db_password = "your-secure-password"
environment = "prod"
```

## Outputs

After applying, Terraform will output:

- `db_endpoint`: PostgreSQL connection endpoint
- `redis_endpoint`: Redis connection endpoint
- `assets_bucket`: S3 bucket for assets
- `backups_bucket`: S3 bucket for backups
- `cdn_domain`: CloudFront CDN domain

## Security Notes

- Database is only accessible from within VPC
- Redis is only accessible from within VPC
- S3 buckets have versioning enabled
- CloudFront enforces HTTPS
- Deletion protection enabled on RDS

## Cost Estimate

Monthly costs (approximate):

- RDS db.t3.medium: ~$60
- ElastiCache cache.t3.small: ~$25
- S3 storage: Variable
- CloudFront: Variable
- NAT Gateway: ~$32
- **Total**: ~$120-200/month

## Next Steps

1. Create S3 bucket for Terraform state
2. Configure AWS credentials
3. Review and customize variables
4. Run `terraform plan` to preview changes
5. Run `terraform apply` to create infrastructure
6. Update application environment variables with outputs
