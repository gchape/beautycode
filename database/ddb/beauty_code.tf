resource "aws_dynamodb_table" "beauty_code" {
  name         = "BeautyCode"
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

  attribute {
    name = "EntityType"
    type = "S"
  }

  attribute {
    name = "Category"
    type = "S"
  }

  global_secondary_index {
    name = "entity-type-index"

    key_schema {
      attribute_name = "EntityType"
      key_type       = "HASH"
    }

    projection_type = "ALL"
  }

  global_secondary_index {
    name = "category-index"

    key_schema {
      attribute_name = "Category"
      key_type       = "HASH"
    }

    projection_type = "ALL"
  }
}
