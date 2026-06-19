terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.39.0"
    }
  }
  required_version = ">= 1.14.0"
}

provider "aws" {
  region = "eu-central-1"
}

locals {
  beauty_code_table_arn        = "arn:aws:dynamodb:eu-central-1:933428634968:table/BeautyCode"
  remember_me_tokens_table_arn = "arn:aws:dynamodb:eu-central-1:933428634968:table/RememberMeTokens"
  images_bucket_arn            = "arn:aws:s3:::beauty-code-images"
}

variable "crisp_website_id" {
  description = "Crisp website ID"
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

resource "aws_dynamodb_table" "remember_me_tokens" {
  name         = "RememberMeTokens"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "Series"

  attribute {
    name = "Series"
    type = "S"
  }
  attribute {
    name = "Email"
    type = "S"
  }

  ttl {
    attribute_name = "ExpiresAt"
    enabled        = true
  }

  global_secondary_index {
    name            = "TokensByEmail"
    projection_type = "KEYS_ONLY"
    key_schema {
      attribute_name = "Email"
      key_type       = "HASH"
    }
  }
}

# --- S3 ---

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

resource "aws_security_group" "frontend" {
  name   = "bc-frontend-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "backend" {
  name   = "bc-backend-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.frontend.id]
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

resource "aws_iam_role" "frontend" {
  name               = "bc-frontend-role"
  assume_role_policy = data.aws_iam_policy_document.ec2_assume_role.json
}

resource "aws_iam_role_policy" "frontend" {
  role = aws_iam_role.frontend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:GetObject", "s3:GetObjectVersion", "s3:ListBucket"]
      Resource = [local.images_bucket_arn, "${local.images_bucket_arn}/*"]
    }]
  })
}

resource "aws_iam_role_policy_attachment" "frontend_ssm" {
  role       = aws_iam_role.frontend.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "frontend" {
  name = "bc-frontend-profile"
  role = aws_iam_role.frontend.name
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
          local.beauty_code_table_arn, "${local.beauty_code_table_arn}/index/*",
          local.remember_me_tokens_table_arn, "${local.remember_me_tokens_table_arn}/index/*"
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

resource "aws_instance" "backend" {
  ami                    = "ami-0a628e1e89aaedf80"
  instance_type          = "t3.small"
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.backend.id]
  iam_instance_profile   = aws_iam_instance_profile.backend.name

  user_data = <<-EOF
    #!/bin/bash
    apt-get update -y
    apt-get install -y docker.io
    systemctl enable docker && systemctl start docker
    docker pull ghcr.io/gchape/beauty-code-backend:latest
    docker run -d \
      --name beauty-code-backend \
      --restart unless-stopped \
      -p 8080:8080 \
      -e AWS_REGION=eu-central-1 \
      -e AWS_DYNAMODB_TABLE_NAME=BeautyCode \
      -e SPRING_PROFILES_ACTIVE=prod \
      ghcr.io/gchape/beauty-code-backend:latest
  EOF

  tags = { Name = "bc-backend" }
}

resource "aws_instance" "frontend" {
  ami                    = "ami-0a628e1e89aaedf80"
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.frontend.id]
  iam_instance_profile   = aws_iam_instance_profile.frontend.name

  user_data = <<-EOF
    #!/bin/bash
    apt-get update -y
    apt-get install -y docker.io
    systemctl enable docker && systemctl start docker
    docker pull ghcr.io/gchape/beauty-code-frontend:latest
    docker run -d \
      --name beauty-code-frontend \
      --restart unless-stopped \
      -p 80:80 -p 443:443 \
      -e BACKEND_URL=http://${aws_instance.backend.private_ip}:8080 \
      -e CRISP_WEBSITE_ID=${var.crisp_website_id} \
      ghcr.io/gchape/beauty-code-frontend:latest
  EOF

  tags = { Name = "bc-frontend" }
}

resource "aws_eip" "frontend" {
  domain   = "vpc"
  instance = aws_instance.frontend.id
}

# --- Outputs ---

output "frontend_ip" {
  value = aws_eip.frontend.public_ip
}

output "backend_ip" {
  value = aws_instance.backend.private_ip
}
