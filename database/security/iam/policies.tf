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
      "arn:aws:dynamodb:eu-central-1:ACCOUNT_ID:table/BeautyCode",
      "arn:aws:dynamodb:eu-central-1:ACCOUNT_ID:table/BeautyCode/index/*"
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
      "arn:aws:s3:::beauty-code",
      "arn:aws:s3:::beauty-code/*"
    ]
  }
}
