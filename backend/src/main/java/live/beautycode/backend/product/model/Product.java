package live.beautycode.backend.product.model;

import live.beautycode.backend.product.dto.ProductCard;
import live.beautycode.backend.product.dto.ProductDetail;
import live.beautycode.backend.product.dto.ProductSummary;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.*;

import java.util.List;

@DynamoDbBean
@Setter
@NoArgsConstructor
public class Product {

    @Getter(onMethod_ = {
            @DynamoDbAttribute("PK"),
            @DynamoDbPartitionKey
    })
    private String pk;

    @Getter(onMethod_ = {
            @DynamoDbAttribute("SK"),
            @DynamoDbSortKey
    })
    private String sk;

    @Getter(onMethod_ = {
            @DynamoDbAttribute("Type"),
            @DynamoDbSecondaryPartitionKey(indexNames = "ProductsByType")
    })
    private String type;

    @Getter(onMethod_ = @DynamoDbAttribute("Id"))
    private String id;

    @Getter(onMethod_ = @DynamoDbAttribute("ImgUrl"))
    private String imgUrl;

    @Getter(onMethod_ = @DynamoDbAttribute("Badge"))
    private String badge;

    @Getter(onMethod_ = {
            @DynamoDbAttribute("Category"),
            @DynamoDbSecondaryPartitionKey(indexNames = "ProductsByCategory")
    })
    private String category;

    @Getter(onMethod_ = @DynamoDbAttribute("Discount"))
    private int discount;

    @Getter(onMethod_ = @DynamoDbAttribute("Title"))
    private String title;

    @Getter(onMethod_ = @DynamoDbAttribute("OldPrice"))
    private double oldPrice;

    @Getter(onMethod_ = @DynamoDbAttribute("NewPrice"))
    private double newPrice;

    @Getter(onMethod_ = @DynamoDbAttribute("Features"))
    private List<String> features;

    @Getter(onMethod_ = @DynamoDbAttribute("Description"))
    private String description;

    @DynamoDbIgnore
    public ProductDetail toDetail() {
        return new ProductDetail(
                id, imgUrl, badge,
                Category.valueOf(category.toUpperCase().replace("-", "_")),
                discount, title, oldPrice, newPrice, features
        );
    }

    @DynamoDbIgnore
    public ProductSummary toSummary() {
        return new ProductSummary(
                id, imgUrl, badge,
                Category.valueOf(category.toUpperCase().replace("-", "_")),
                discount, title, oldPrice, newPrice, description
        );
    }

    @DynamoDbIgnore
    public ProductCard toCard() {
        return new ProductCard(
                id, imgUrl, badge,
                Category.valueOf(category.toUpperCase().replace("-", "_")),
                discount, title, oldPrice, newPrice
        );
    }
}
