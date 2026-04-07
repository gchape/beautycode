output "ddb_dev_access_key_id" {
  value = aws_iam_access_key.bc_ddb_dev_access_key.id
}

output "ddb_dev_secret_access_key" {
  value     = aws_iam_access_key.bc_ddb_dev_access_key.secret
  sensitive = true
}
