output "dynamodb_table_name" {
  value       = aws_dynamodb_table.beautycode_table.name
  description = "DynamoDB table name"
}

output "dynamodb_table_arn" {
  value       = aws_dynamodb_table.beautycode_table.arn
  description = "DynamoDB table ARN"
}

output "iam_user_access_key_id" {
  value       = aws_iam_access_key.dynamodb_user_key.id
  description = "Access key ID for the DynamoDB IAM user"
}

output "iam_user_secret_access_key" {
  value       = aws_iam_access_key.dynamodb_user_key.secret
  description = "Secret access key for the DynamoDB IAM user"
  sensitive   = true
}