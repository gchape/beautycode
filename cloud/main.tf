terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.54.0"
    }
  }
  required_version = ">= 1.15.8"
}

provider "aws" {
  region = "eu-central-1"
}

# CloudFront + ACM require certs in us-east-1 regardless of where everything else lives
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

locals {
  beauty_code_table_arn = "arn:aws:dynamodb:eu-central-1:933428634968:table/BeautyCode"
  images_bucket_arn     = "arn:aws:s3:::beauty-code-images"
  frontend_bucket_arn   = "arn:aws:s3:::beauty-code-frontend"
  api_domain            = "api.beautycode.live"
  site_domain           = "beautycode.live"
  site_domain_www       = "www.beautycode.live"
}

variable "crisp_website_id" {
  description = "Crisp website ID"
  type        = string
  sensitive   = true
}

variable "certbot_email" {
  description = "Email used for Let's Encrypt certificate registration/renewal notices"
  type        = string
}

variable "vault_token" {
  description = "Vault dev root token, shared between vault and backend containers"
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

# --- S3: Frontend static site (private, only CloudFront can read) ---

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

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html" # SPA fallback for client-side routing
  }
}

# --- ACM certificate for CloudFront (must be us-east-1) ---

resource "aws_acm_certificate" "frontend" {
  provider                  = aws.us_east_1
  domain_name                = local.site_domain
  subject_alternative_names  = [local.site_domain_www]
  validation_method          = "DNS"

  lifecycle {
    create_before_destroy = true
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
  aliases             = [local.site_domain, local.site_domain_www]

  origin {
    domain_name              = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id                = "frontend-s3"
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
  }

  origin {
    domain_name = aws_s3_bucket.beauty_code_images.bucket_regional_domain_name
    origin_id   = "images-s3"

    s3_origin_config {
      origin_access_identity = "" # bucket is already public via its own policy, no OAC/OAI needed
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
    compress                 = false # images are already compressed formats

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 31536000 # 1 year
    max_ttl     = 31536000
  }

  # SPA fallback: unknown paths (client-side routes) serve index.html
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
    acm_certificate_arn      = aws_acm_certificate.frontend.arn
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

# --- VPC ---

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/24"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags                 = { Name = "bc-vpc" }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "bc-igw" }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.0.0/24"
  map_public_ip_on_launch = true
  tags                    = { Name = "bc-public" }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  tags = { Name = "bc-rt" }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# --- Security Groups ---

resource "aws_security_group" "backend" {
  name   = "bc-backend-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # certbot HTTP-01 challenge + HTTP->HTTPS redirect
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # frontend (CloudFront) and browsers call this directly
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
          local.beauty_code_table_arn, "${local.beauty_code_table_arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket", "s3:GetObject",
          "s3:GetObjectVersion", "s3:PutObject",
          "s3:DeleteObject", "s3:DeleteObjectVersion"
        ]
        Resource = [local.images_bucket_arn, "${local.images_bucket_arn}/*"]
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

# --- EC2 ---
# NOTE: backend, backend-config-server, and vault are all built FROM SOURCE on
# the instance via `git clone` + `docker compose build`, using the repo's own
# docker-compose.yml (https://github.com/gchape/beauty-code). No ghcr images
# are used anywhere. The `frontend` service in that compose file is skipped
# entirely -- the frontend is a static build served from S3 + CloudFront, not
# run on this instance.

resource "aws_instance" "backend" {
  ami                    = "ami-0a628e1e89aaedf80"
  instance_type          = "t3.small"
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.backend.id]
  iam_instance_profile   = aws_iam_instance_profile.backend.name

  user_data = <<-EOF
    #!/bin/bash
    set -e
    apt-get update -y
    apt-get install -y docker.io docker-compose-v2 git nginx certbot python3-certbot-nginx

    systemctl enable docker && systemctl start docker

    rm -rf /opt/beauty-code
    git clone --depth 1 --filter=blob:none --sparse https://github.com/gchape/beauty-code.git /opt/beauty-code
    cd /opt/beauty-code
    git sparse-checkout set backend

    cat > /opt/beauty-code/backend/.env <<ENVFILE
    VAULT_TOKEN=${vault_token}
    ENVFILE

    cd /opt/beauty-code/backend

    # docker-compose.yml here only defines vault, backend-config-server,
    # backend -- the frontend is served separately via S3/CloudFront and was
    # never part of this clone at all (sparse-checkout skips it entirely).
    docker compose build
    docker compose up -d

    cat > /etc/nginx/sites-available/api <<'NGINX'
    server {
        listen 80;
        server_name ${api_domain};

        location / {
            proxy_pass http://127.0.0.1:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    NGINX

    ln -sf /etc/nginx/sites-available/api /etc/nginx/sites-enabled/api
    rm -f /etc/nginx/sites-enabled/default
    systemctl restart nginx

    # NOTE: certbot is intentionally NOT run here.
    # DNS for ${api_domain} must point at this instance's Elastic IP first
    # (see terraform output backend_eip). Once DNS has propagated, connect
    # via SSM and run:
    #   certbot --nginx -d ${api_domain} --non-interactive --agree-tos -m ${certbot_email}
  EOF

  tags = { Name = "bc-backend" }
}

resource "aws_eip" "backend" {
  domain   = "vpc"
  instance = aws_instance.backend.id
}

# --- Outputs ---

output "backend_eip" {
  value       = aws_eip.backend.public_ip
  description = "Point api.beautycode.live A record at this IP at name.com, then run certbot via SSM."
}

output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.frontend.domain_name
  description = "Target for the ALIAS (apex) and CNAME (www) records at name.com."
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
