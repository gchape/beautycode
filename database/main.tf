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
  region = "eu-cental-1"
}
