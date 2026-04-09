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
}

resource "aws_dynamodb_global_secondary_index" "entity_type_index" {
  table_name = aws_dynamodb_table.beauty_code.name
  index_name = "entity-type-index"

  key_schema {
    attribute_name = "EntityType"
    attribute_type = "S"
    key_type       = "HASH"
  }

  projection {
    projection_type = "ALL"
  }
}

resource "aws_dynamodb_global_secondary_index" "category_index" {
  table_name = aws_dynamodb_table.beauty_code.name
  index_name = "category-index"

  key_schema {
    attribute_name = "Category"
    attribute_type = "S"
    key_type       = "HASH"
  }

  projection {
    projection_type = "ALL"
  }
}
