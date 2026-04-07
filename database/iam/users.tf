resource "aws_iam_user" "bc_ddb_dev_user" {
  name = "bc-ddb-dev"
}

data "aws_iam_policy_document" "bc_ddb_dev_policy_doc" {
  statement {
    sid    = "DynamoDbDevAccess"
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
      "arn:aws:dynamodb:REGION:ACCOUNT_ID:table/YOUR_TABLE_NAME",
      "arn:aws:dynamodb:REGION:ACCOUNT_ID:table/YOUR_TABLE_NAME/index/*"
    ]
  }
}

resource "aws_iam_policy" "bc_ddb_dev_policy" {
  name   = "bc-ddb-dev-policy"
  policy = data.aws_iam_policy_document.bc_ddb_dev_policy_doc.json
}

resource "aws_iam_user_policy_attachment" "bc_ddb_dev_attachment" {
  user       = aws_iam_user.bc_ddb_dev_user.name
  policy_arn = aws_iam_policy.bc_ddb_dev_policy.arn
}

resource "aws_iam_access_key" "bc_ddb_dev_access_key" {
  user = aws_iam_user.bc_ddb_dev_user.name
}
