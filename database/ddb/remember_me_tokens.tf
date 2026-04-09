resource "aws_dynamodb_table" "remember_me_tokens" {
  name         = "RememberMeTokens"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "series"

  attribute {
    name = "series"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  attribute {
    name = "tokenValue"
    type = "S"
  }

  attribute {
    name = "lastUsed"
    type = "S"
  }

  attribute {
    name = "expiresAt"
    type = "N"
  }

  ttl {
    attribute_name = "expiresAt"
    enabled        = true
  }

  global_secondary_index {
    name = "email-index"

    key_schema {
      attribute_name = "email"
      key_type       = "HASH"
    }

    projection_type = "ALL"
  }
}
