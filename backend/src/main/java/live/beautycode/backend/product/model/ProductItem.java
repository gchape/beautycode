package ge.beauty_code.backend.product.model;

import java.util.List;

public record ProductItem(
        String id,
        String imgUrl,
        String badge,
        Category category,
        int discount,
        String title,
        double oldPrice,
        double newPrice,
        List<String> features
) {
}
