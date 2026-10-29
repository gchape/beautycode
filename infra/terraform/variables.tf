variable "aws_region" {
  description = "AWS region for the production deployment."
  type        = string
  default     = "eu-central-1"
}

variable "domain" {
  description = "Public hostname served by this application."
  type        = string

  validation {
    condition     = can(regex("^[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", var.domain))
    error_message = "domain must be a fully qualified DNS name."
  }
}

variable "instance_type" {
  description = "EC2 instance size."
  type        = string
  default     = "t3.small"

  validation {
    condition     = contains(["t3.small", "t3.medium", "t3.large"], var.instance_type)
    error_message = "instance_type must be t3.small, t3.medium, or t3.large (the selected AMI is x86_64)."
  }
}

variable "root_volume_size" {
  description = "Encrypted gp3 root volume size in GiB."
  type        = number
  default     = 30

  validation {
    condition     = var.root_volume_size >= 30 && var.root_volume_size <= 1024
    error_message = "root_volume_size must be between 30 and 1024 GiB."
  }
}
