package ge.beauty_code.backend.product.dto;

import ge.beauty_code.backend.model.ProductCategory;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.util.List;
import java.util.Map;

public record ProductDto(
        String id,
        String imgUrl,
        String badge,
        ProductCategory category,
        int discount,
        String title,
        double oldPrice,
        double newPrice,
        List<String> features
) {
    public static ProductDto mapToDto(Map<String, AttributeValue> item) {
        return new ProductDto(
                item.get("Id").s(),
                item.get("ImgUrl").s(),
                item.get("Badge").s(),
                ProductCategory.valueOf(item.get("Category").s().toUpperCase().replace("-", "_")),
                Integer.parseInt(item.get("Discount").n()),
                item.get("Title").s(),
                Double.parseDouble(item.get("OldPrice").n()),
                Double.parseDouble(item.get("NewPrice").n()),
                item.get("Features").l().stream()
                        .map(AttributeValue::s)
                        .toList()
        );
    }
}
