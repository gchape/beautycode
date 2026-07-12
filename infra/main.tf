terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.54.0"
    }
  }
  required_version = ">= 1.15.7"
}

provider "aws" {
  region = "eu-central-1"
}

# CloudFront + ACM require certs in us-east-1 regardless of where everything else lives
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

data "aws_caller_identity" "current" {}

locals {
  api_domain      = "api.beautycode.live"
  site_domain     = "beautycode.live"
  site_domain_www = "www.beautycode.live"
  ssm_vault_path  = "/beautycode/vault"
}

variable "crisp_website_id" {
  description = "Crisp website ID"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "HS256 signing secret for JWT (min 32 bytes), seeded into SSM Parameter Store"
  type        = string
  sensitive   = true
}

variable "ldap_admin_password" {
  description = "Password for the LDAP admin bind user, seeded into SSM Parameter Store and into OpenLDAP bootstrap"
  type        = string
  sensitive   = true
}

variable "postgres_user" {
  description = "Postgres username for the backend database, passed via SSM to the postgres container and the backend's datasource config"
  type        = string
  sensitive   = true
}

variable "postgres_password" {
  description = "Postgres password, seeded into SSM Parameter Store (spring.datasource.password) and passed to the postgres container"
  type        = string
  sensitive   = true
}

# --- DynamoDB ---

resource "aws_dynamodb_table" "beauty_code" {
  name         = "BeautyCode"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "PK"
  range_key    = "SK"

  attribute {
    name = "PK"
    type = "S"
  }
  attribute {
    name = "SK"
    type = "S"
  }
  attribute {
    name = "Type"
    type = "S"
  }
  attribute {
    name = "Category"
    type = "S"
  }

  global_secondary_index {
    name            = "ProductsByType"
    projection_type = "ALL"
    key_schema {
      attribute_name = "Type"
      key_type       = "HASH"
    }
  }

  global_secondary_index {
    name            = "ProductsByCategory"
    projection_type = "ALL"
    key_schema {
      attribute_name = "Category"
      key_type       = "HASH"
    }
  }
}

# --- S3: Images (public, also served through CloudFront as /images/*) ---

resource "aws_s3_bucket" "beauty_code_images" {
  bucket = "beauty-code-images"
}

resource "aws_s3_bucket_public_access_block" "beauty_code_images" {
  bucket                  = aws_s3_bucket.beauty_code_images.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "beauty_code_images" {
  bucket     = aws_s3_bucket.beauty_code_images.id
  depends_on = [aws_s3_bucket_public_access_block.beauty_code_images]
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "PublicReadGetObject"
      Effect    = "Allow"
      Principal = "*"
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.beauty_code_images.arn}/*"
    }]
  })
}

# --- S3: Frontend static site (private, only CloudFront can read via OAC) ---

resource "aws_s3_bucket" "frontend" {
  bucket = "beauty-code-frontend"
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket                  = aws_s3_bucket.frontend.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# --- ACM certificate for CloudFront (must be us-east-1) ---

resource "aws_acm_certificate" "frontend" {
  provider                  = aws.us_east_1
  domain_name               = local.site_domain
  subject_alternative_names = [local.site_domain_www, local.api_domain]
  validation_method          = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "frontend" {
  provider        = aws.us_east_1
  certificate_arn = aws_acm_certificate.frontend.arn

  timeouts {
    create = "45m"
  }
}

# --- CloudFront ---

resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "bc-frontend-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "frontend" {
  enabled             = true
  default_root_object = "index.html"
  aliases             = [local.site_domain, local.site_domain_www, local.api_domain]

  origin {
    domain_name              = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id                = "frontend-s3"
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
  }

  origin {
    domain_name = aws_s3_bucket.beauty_code_images.bucket_regional_domain_name
    origin_id   = "images-s3"

    s3_origin_config {
      origin_access_identity = ""
    }
  }

  origin {
    domain_name = aws_eip.backend.public_dns
    origin_id    = "backend-api"

    custom_origin_config {
      http_port              = 80
      https_port              = 443
      origin_protocol_policy  = "http-only"
      origin_ssl_protocols    = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods          = ["GET", "HEAD"]
    target_origin_id        = "frontend-s3"
    viewer_protocol_policy  = "redirect-to-https"
    compress                = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  ordered_cache_behavior {
    path_pattern            = "/images/*"
    allowed_methods         = ["GET", "HEAD"]
    cached_methods           = ["GET", "HEAD"]
    target_origin_id         = "images-s3"
    viewer_protocol_policy   = "redirect-to-https"
    compress                 = false

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 31536000
    max_ttl     = 31536000
  }

  ordered_cache_behavior {
    path_pattern            = "/api/*"
    allowed_methods         = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods           = ["GET", "HEAD"]
    target_origin_id         = "backend-api"
    viewer_protocol_policy   = "redirect-to-https"
    compress                 = true

    forwarded_values {
      query_string = true
      headers      = ["Authorization", "Content-Type", "Origin"]
      cookies {
        forward = "all"
      }
    }

    min_ttl     = 0
    default_ttl = 0
    max_ttl     = 0
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.frontend.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "AllowCloudFrontServicePrincipal"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.frontend.arn}/*"
      Condition = {
        StringEquals = {
          "AWS:SourceArn" = aws_cloudfront_distribution.frontend.arn
        }
      }
    }]
  })
}

# --- Default VPC ---
# Single always-on instance, no private resources -- the account's default
# VPC already gives us a public, IGW-routed subnet per AZ for free, so we
# don't maintain our own VPC/IGW/route table. Pinning to a specific AZ's
# default subnet (rather than data.aws_subnets.default.ids[0]) keeps the
# instance's subnet choice stable across plans.

data "aws_vpc" "default" {
  default = true
}

data "aws_subnet" "default_az1" {
  vpc_id            = data.aws_vpc.default.id
  availability_zone = "eu-central-1a"
  default_for_az    = true
}

# --- Security Groups ---
# Fix #4: restrict inbound :80 to CloudFront's own origin-facing IP ranges
# instead of 0.0.0.0/0, using AWS's managed prefix list -- no app-level
# header check needed, and it stays current automatically as CloudFront's
# ranges change over time.

data "aws_ec2_managed_prefix_list" "cloudfront" {
  name = "com.amazonaws.global.cloudfront.origin-facing"
}

resource "aws_security_group" "backend" {
  name   = "bc-backend-sg"
  vpc_id = data.aws_vpc.default.id

  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    prefix_list_ids = [data.aws_ec2_managed_prefix_list.cloudfront.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# --- IAM ---

data "aws_iam_policy_document" "ec2_assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "backend" {
  name               = "bc-backend-role"
  assume_role_policy = data.aws_iam_policy_document.ec2_assume_role.json
}

resource "aws_iam_role_policy" "backend" {
  role = aws_iam_role.backend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:BatchGetItem", "dynamodb:ConditionCheckItem",
          "dynamodb:DeleteItem", "dynamodb:DescribeTable",
          "dynamodb:GetItem", "dynamodb:PutItem",
          "dynamodb:Query", "dynamodb:Scan",
          "dynamodb:UpdateItem"
        ]
        Resource = [
          aws_dynamodb_table.beauty_code.arn, "${aws_dynamodb_table.beauty_code.arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket", "s3:GetObject",
          "s3:GetObjectVersion", "s3:PutObject",
          "s3:DeleteObject", "s3:DeleteObjectVersion"
        ]
        Resource = [aws_s3_bucket.beauty_code_images.arn, "${aws_s3_bucket.beauty_code_images.arn}/*"]
      },
      {
        Effect = "Allow"
        Action = ["kms:Encrypt", "kms:Decrypt", "kms:DescribeKey", "kms:GenerateDataKey"]
        Resource = [aws_kms_key.vault_unseal.arn]
      },
      {
        Effect = "Allow"
        Action = ["ssm:PutParameter", "ssm:GetParameter", "ssm:GetParameters"]
        Resource = [
          "arn:aws:ssm:eu-central-1:${data.aws_caller_identity.current.account_id}:parameter${local.ssm_vault_path}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "backend_ssm" {
  role       = aws_iam_role.backend.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "backend" {
  name = "bc-backend-profile"
  role = aws_iam_role.backend.name
}

# --- KMS (Vault auto-unseal) ---
# Vault runs with file storage + awskms auto-seal. On every container
# (re)start, Vault unseals itself automatically using this key -- no manual
# unseal-key handling. `vault operator init` runs once per fresh data
# volume; the boot script does that and stores the generated root token in
# SSM Parameter Store so redeploys can reuse it.

resource "aws_kms_key" "vault_unseal" {
  description             = "KMS key for Vault auto-unseal (awskms seal)"
  deletion_window_in_days = 7
  enable_key_rotation     = true
}

resource "aws_kms_alias" "vault_unseal" {
  name          = "alias/bc-vault-unseal"
  target_key_id = aws_kms_key.vault_unseal.key_id
}

# --- EC2 ---

resource "aws_instance" "backend" {
  ami                    = "ami-0a628e1e89aaedf80"
  instance_type          = "t3.small"
  subnet_id              = data.aws_subnet.default_az1.id
  vpc_security_group_ids = [aws_security_group.backend.id]
  iam_instance_profile   = aws_iam_instance_profile.backend.name

  user_data = templatefile("${path.module}/templates/backend_init.sh.tftpl", {
    jwt_secret           = var.jwt_secret
    ldap_admin_password  = var.ldap_admin_password
    postgres_user        = var.postgres_user
    postgres_password    = var.postgres_password
    kms_key_id            = aws_kms_key.vault_unseal.key_id
    ssm_vault_path        = local.ssm_vault_path
    api_domain            = local.api_domain
  })

  tags = { Name = "bc-backend" }
}

resource "aws_eip" "backend" {
  domain   = "vpc"
  instance = aws_instance.backend.id
}

# --- Outputs ---

output "backend_eip" {
  value       = aws_eip.backend.public_ip
  description = "Static IP of the backend instance. Not a DNS target -- CloudFront reaches it internally via public_dns. Useful for debugging/SSM only."
}

output "backend_instance_id" {
  value       = aws_instance.backend.id
  description = "EC2 instance ID, needed for `aws ssm send-command --instance-ids` to redeploy backend changes without recreating the instance."
}

output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.frontend.domain_name
  description = "Target for ALL THREE records at name.com: apex (beautycode.live, ALIAS/ANAME), www (CNAME), and api (CNAME)."
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.frontend.id
  description = "Needed for `aws cloudfront create-invalidation` after every frontend deploy."
}

output "frontend_bucket_name" {
  value       = aws_s3_bucket.frontend.bucket
  description = "Target for `aws s3 sync` when deploying the built frontend."
}

output "acm_validation_records" {
  value = [
    for dvo in aws_acm_certificate.frontend.domain_validation_options : {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  ]
  description = "Add these CNAME records at name.com to validate the ACM certificate before CloudFront can use it."
}

output "vault_kms_key_id" {
  value       = aws_kms_key.vault_unseal.key_id
  description = "KMS key used for Vault auto-unseal. Not secret, but useful for debugging seal status."
}

output "vite_crisp_website_id" {
  value       = var.crisp_website_id
  sensitive   = true
  description = "Set as VITE_CRISP_WEBSITE_ID before building the frontend. Requires `terraform output -raw vite_crisp_website_id` since it's sensitive."
}

output "vite_api_url" {
  value       = "https://${local.api_domain}"
  description = "Set as VITE_API_URL before building the frontend."
}
