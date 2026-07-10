package live.beautycode.backend.product.repository;

import live.beautycode.backend.product.dto.ProductDto;
import live.beautycode.backend.product.model.Category;
import live.beautycode.backend.product.model.Product;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.*;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.services.dynamodb.model.ConditionalCheckFailedException;

import java.util.List;
import java.util.Optional;

@Repository
public class ProductRepository {

    private final DynamoDbTable<Product> productTable;
    private final DynamoDbIndex<Product> productsByType;
    private final DynamoDbIndex<Product> productsByCategory;

    public ProductRepository(DynamoDbEnhancedClient enhancedClient,
                             @Value("${spring.cloud.aws.dynamodb.table-name}") String tableName) {
        this.productTable = enhancedClient.table(tableName, TableSchema.fromBean(Product.class));
        this.productsByType = productTable.index("ProductsByType");
        this.productsByCategory = productTable.index("ProductsByCategory");
    }

    public boolean save(ProductDto product) {
        Product entity = Product.fromDomain(product);
        try {
            productTable.putItem(r -> r
                    .item(entity)
                    .conditionExpression(Expression.builder()
                            .expression("attribute_not_exists(PK)")
                            .build()));
            return true;
        } catch (ConditionalCheckFailedException e) {
            return false;
        }
    }

    public Optional<ProductDto> findById(String id) {
        Product entity = productTable.getItem(Key.builder()
                .partitionValue("PRODUCT#" + id)
                .sortValue("PRODUCT#" + id)
                .build());

        return Optional.ofNullable(entity).map(Product::toDto);
    }

    public List<ProductDto> findAll() {
        return productsByType.query(QueryConditional.keyEqualTo(Key.builder()
                        .partitionValue("Product")
                        .build()))
                .stream()
                .flatMap(page -> page.items().stream())
                .map(Product::toDto)
                .toList();
    }

    public List<ProductDto> findByCategory(Category category) {
        return productsByCategory.query(QueryConditional.keyEqualTo(Key.builder()
                        .partitionValue(category.toString())
                        .build()))
                .stream()
                .flatMap(page -> page.items().stream())
                .map(Product::toDto)
                .toList();
    }
}
