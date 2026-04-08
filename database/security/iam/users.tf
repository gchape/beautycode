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
