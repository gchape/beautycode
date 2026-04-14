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
    name = "ProductsByType"
    key_schema {
      attribute_name = "Type"
      key_type       = "HASH"
    }
    projection_type = "ALL"
  }

  global_secondary_index {
    name = "ProductsByCategory"
    key_schema {
      attribute_name = "Category"
      key_type       = "HASH"
    }
    projection_type = "ALL"
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
    name = "TokensByEmail"
    key_schema {
      attribute_name = "Email"
      key_type       = "HASH"
    }
    projection_type = "KEYS_ONLY"
  }
}

data "aws_iam_policy_document" "bc_dev_policy_doc" {
  statement {
    sid    = "BeautyCodeTableReadWriteAccess"
    effect = "Allow"
    actions = [
      "dynamodb:BatchGetItem",
      "dynamodb:ConditionCheckItem",
      "dynamodb:DeleteItem",
      "dynamodb:DescribeTable",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:UpdateItem"
    ]
    resources = [
      "arn:aws:dynamodb:eu-central-1:933428634968:table/BeautyCode",
      "arn:aws:dynamodb:eu-central-1:933428634968:table/BeautyCode/index/*",
      "arn:aws:dynamodb:eu-central-1:933428634968:table/RememberMeTokens",
      "arn:aws:dynamodb:eu-central-1:933428634968:table/RememberMeTokens/index/*"
    ]
  }

  statement {
    sid    = "BeautyCodeBucketReadWriteAccess"
    effect = "Allow"
    actions = [
      "s3:ListBucket",
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:PutObject",
      "s3:DeleteObject",
      "s3:DeleteObjectVersion"
    ]
    resources = [
      "arn:aws:s3:::beauty-code-images",
      "arn:aws:s3:::beauty-code-images/*"
    ]
  }
}

resource "aws_iam_user" "bc_dev_user" {
  name = "beautycode-dev"
}

resource "aws_iam_policy" "bc_dev_policy" {
  name   = "beautycode-dev-policy"
  policy = data.aws_iam_policy_document.bc_dev_policy_doc.json
}

resource "aws_iam_user_policy_attachment" "bc_dev_attachment" {
  user       = aws_iam_user.bc_dev_user.name
  policy_arn = aws_iam_policy.bc_dev_policy.arn
}

resource "aws_iam_access_key" "bc_dev_access_key" {
  user = aws_iam_user.bc_dev_user.name
}

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
  bucket = aws_s3_bucket.beauty_code_images.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.beauty_code_images.arn}/*"
      }
    ]
  })
  depends_on = [aws_s3_bucket_public_access_block.beauty_code_images]
}
