package live.beautycode.backend.product.model;

import live.beautycode.backend.product.dto.ProductDto;
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

    public static Product fromDomain(ProductDto product) {
        Product entity = new Product();
        entity.setPk("PRODUCT#" + product.id());
        entity.setSk("PRODUCT#" + product.id());
        entity.setType("Product");
        entity.setId(product.id());
        entity.setImgUrl(product.imgUrl());
        entity.setBadge(product.badge());
        entity.setCategory(product.category().toString());
        entity.setDiscount(product.discount());
        entity.setTitle(product.title());
        entity.setOldPrice(product.oldPrice());
        entity.setNewPrice(product.newPrice());
        entity.setFeatures(product.features());
        return entity;
    }

    public ProductDto toDto() {
        return new ProductDto(
                id,
                imgUrl,
                badge,
                Category.valueOf(category.toUpperCase().replace("-", "_")),
                discount,
                title,
                oldPrice,
                newPrice,
                features
        );
    }
}
