output "public_ip" {
  description = "Elastic IP for the domain's DNS A record."
  value       = aws_eip.app.public_ip
}

output "instance_id" {
  description = "EC2 instance ID for Session Manager access."
  value       = aws_instance.app.id
}

output "backups_bucket" {
  description = "S3 bucket name used by the application and backup script."
  value       = aws_s3_bucket.backups.id
}

output "vpc_id" {
  description = "Terraform-created application VPC."
  value       = aws_vpc.app.id
}
