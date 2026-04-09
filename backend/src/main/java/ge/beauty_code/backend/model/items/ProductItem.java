package ge.beauty_code.backend.model.items;

import ge.beauty_code.backend.model.ProductCategory;

import java.util.List;

public record ProductItem(
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
}
