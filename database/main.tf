provider "aws" {
  region = var.aws_region
}

# --- IAM Group ---
resource "aws_iam_group" "dynamodb_group" {
  name = "beautycode-dynamodb-group"
}

# --- IAM Policy Document ---
data "aws_iam_policy_document" "dynamodb_policy_doc" {
  statement {
    sid    = "DynamoDBManagement"
    effect = "Allow"
    actions = [
      "dynamodb:CreateTable",
      "dynamodb:DeleteTable",
      "dynamodb:DescribeTable",
      "dynamodb:ListTables",
      "dynamodb:UpdateTable",
      "dynamodb:PutItem",
      "dynamodb:GetItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:BatchGetItem",
      "dynamodb:BatchWriteItem",
      "dynamodb:DescribeTimeToLive",
      "dynamodb:UpdateTimeToLive",
      "dynamodb:ListTagsOfResource",
      "dynamodb:TagResource",
      "dynamodb:UntagResource"
    ]
    resources = [
      aws_dynamodb_table.beautycode_table.arn
    ]
  }
}

# --- Managed IAM Policy ---
resource "aws_iam_policy" "dynamodb_policy" {
  name        = "beautycode-dynamodb-policy"
  description = "Allows DynamoDB management for BeautyCode"
  policy      = data.aws_iam_policy_document.dynamodb_policy_doc.json
  tags = {
    Company   = "BeautyCode"
    Service   = "DynamoDB"
    ManagedBy = "Terraform"
  }
}

# --- Attach Policy to Group ---
resource "aws_iam_group_policy_attachment" "dynamodb_group_attachment" {
  group      = aws_iam_group.dynamodb_group.name
  policy_arn = aws_iam_policy.dynamodb_policy.arn
}

# --- IAM User ---
resource "aws_iam_user" "dynamodb_user" {
  name          = "beautycode-dynamodb-user"
  force_destroy = true
  tags = {
    Company   = "BeautyCode"
    Service   = "DynamoDB"
    ManagedBy = "Terraform"
  }
}

# --- Add User to Group ---
resource "aws_iam_user_group_membership" "dynamodb_membership" {
  user   = aws_iam_user.dynamodb_user.name
  groups = [aws_iam_group.dynamodb_group.name]
}

# --- Access Key ---
resource "aws_iam_access_key" "dynamodb_user_key" {
  user = aws_iam_user.dynamodb_user.name
}

# --- DynamoDB Table ---
resource "aws_dynamodb_table" "beautycode_table" {
  name         = "beautycode-table"
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

  ttl {
    attribute_name = "ExpiresAt"
    enabled        = true
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = {
    Company   = "BeautyCode"
    Service   = "DynamoDB"
    ManagedBy = "Terraform"
  }
}