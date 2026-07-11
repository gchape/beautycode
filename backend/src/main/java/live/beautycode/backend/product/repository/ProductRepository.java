package live.beautycode.backend.product.repository;

import live.beautycode.backend.dynamodb.properties.DynamoDbProperties;
import live.beautycode.backend.product.model.Category;
import live.beautycode.backend.product.model.Product;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.*;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;

import java.util.List;
import java.util.Optional;

@Repository
public class ProductRepository {

    // Card view: smallest payload — grid/hero/featured-strip, no description or features
    private static final List<String> CARD_ATTRIBUTES = List.of(
            "Id", "ImgUrl", "Badge", "Category", "Discount", "Title", "OldPrice", "NewPrice"
    );

    // Summary view: adds Description (one-line snippet), still no full Features list
    private static final List<String> SUMMARY_ATTRIBUTES = List.of(
            "Id", "ImgUrl", "Badge", "Category", "Discount", "Title", "OldPrice", "NewPrice", "Description"
    );

    private final DynamoDbTable<Product> productTable;
    private final DynamoDbIndex<Product> productsByType;
    private final DynamoDbIndex<Product> productsByCategory;

    public ProductRepository(
            DynamoDbEnhancedClient enhancedClient,
            DynamoDbProperties dynamoDbProperties
    ) {
        this.productTable = enhancedClient.table(dynamoDbProperties.tableName(), TableSchema.fromBean(Product.class));
        this.productsByType = productTable.index("ProductsByType");
        this.productsByCategory = productTable.index("ProductsByCategory");
    }

    public Optional<Product> findById(String id) {
        Product entity = productTable.getItem(Key.builder()
                .partitionValue("PRODUCT#" + id)
                .sortValue("PRODUCT#" + id)
                .build());
        return Optional.ofNullable(entity);
    }

    public List<Product> findAllCards() {
        return queryByType(CARD_ATTRIBUTES);
    }

    public List<Product> findAllSummaries() {
        return queryByType(SUMMARY_ATTRIBUTES);
    }

    public List<Product> findByCategoryCards(Category category) {
        return queryByCategory(category, CARD_ATTRIBUTES);
    }

    public List<Product> findByCategorySummaries(Category category) {
        return queryByCategory(category, SUMMARY_ATTRIBUTES);
    }

    private List<Product> queryByType(List<String> attributes) {
        return productsByType.query(r -> r
                        .queryConditional(QueryConditional.keyEqualTo(Key.builder().partitionValue("Product").build()))
                        .attributesToProject(attributes))
                .stream()
                .flatMap(page -> page.items().stream())
                .toList();
    }

    private List<Product> queryByCategory(Category category, List<String> attributes) {
        return productsByCategory.query(r -> r
                        .queryConditional(QueryConditional.keyEqualTo(Key.builder().partitionValue(category.toString()).build()))
                        .attributesToProject(attributes))
                .stream()
                .flatMap(page -> page.items().stream())
                .toList();
    }
}
