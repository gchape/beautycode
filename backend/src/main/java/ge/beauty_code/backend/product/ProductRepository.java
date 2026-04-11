package ge.beauty_code.backend.product;

import ge.beauty_code.backend.product.dto.ProductDto;
import ge.beauty_code.backend.product.model.Category;
import ge.beauty_code.backend.product.model.ProductItem;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.ConditionalCheckFailedException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class ProductRepository {

    private final static String TABLE = "BeautyCode";

    private final DynamoDbClient dynamoDbClient;

    @Autowired
    public ProductRepository(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    public boolean save(@NonNull ProductItem product) {
        try {
            dynamoDbClient.putItem(r -> r
                    .tableName(TABLE)
                    .item(Map.ofEntries(
                            Map.entry("PK", AttributeValue.fromS("PRODUCT#" + product.id())),
                            Map.entry("SK", AttributeValue.fromS("PRODUCT#" + product.id())),

                            Map.entry("Type", AttributeValue.fromS("Product")),

                            Map.entry("Id", AttributeValue.fromS(product.id())),
                            Map.entry("ImgUrl", AttributeValue.fromS(product.imgUrl())),
                            Map.entry("Badge", AttributeValue.fromS(product.badge())),
                            Map.entry("Category", AttributeValue.fromS(product.category().toString())),
                            Map.entry("Discount", AttributeValue.fromN(String.valueOf(product.discount()))),
                            Map.entry("Title", AttributeValue.fromS(product.title())),
                            Map.entry("OldPrice", AttributeValue.fromN(String.valueOf(product.oldPrice()))),
                            Map.entry("NewPrice", AttributeValue.fromN(String.valueOf(product.newPrice()))),
                            Map.entry("Features", AttributeValue.fromL(
                                    product.features().stream()
                                            .map(AttributeValue::fromS)
                                            .toList()
                            ))))
                    .conditionExpression("attribute_not_exists(PK)")
            );
            return true;
        } catch (ConditionalCheckFailedException e) {
            return false;
        }
    }

    public Optional<ProductDto> findById(@NonNull String id) {
        var response = dynamoDbClient.getItem(r -> r
                .tableName(TABLE)
                .key(Map.of(
                        "PK", AttributeValue.fromS("PRODUCT#" + id),
                        "SK", AttributeValue.fromS("PRODUCT#" + id)
                ))
        );

        if (!response.hasItem()) {
            return Optional.empty();
        }

        var item = response.item();
        return Optional.of(ProductDto.mapToDto(item));
    }

    public List<ProductDto> findAll() {
        return dynamoDbClient.query(r -> r
                        .tableName(TABLE)
                        .indexName("ProductsByType")
                        .keyConditionExpression("#t = :type")
                        .expressionAttributeNames(Map.of("#t", "Type"))
                        .expressionAttributeValues(Map.of(
                                ":type", AttributeValue.fromS("Product")
                        )))
                .items()
                .stream()
                .map(ProductDto::mapToDto)
                .toList();
    }

    public List<ProductDto> findByCategory(@NonNull Category category) {
        return dynamoDbClient.query(r -> r
                        .tableName(TABLE)
                        .indexName("ProductsByCategory")
                        .keyConditionExpression("Category = :category")
                        .expressionAttributeValues(Map.of(
                                ":category", AttributeValue.fromS(category.toString())
                        )))
                .items()
                .stream()
                .map(ProductDto::mapToDto)
                .toList();
    }
}
