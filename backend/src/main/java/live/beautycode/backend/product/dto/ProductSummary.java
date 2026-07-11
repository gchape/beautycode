package live.beautycode.backend.product.dto;

import live.beautycode.backend.product.model.Category;

public record ProductSummary(
        String id,
        String imgUrl,
        String badge,
        Category category,
        int discount,
        String title,
        double oldPrice,
        double newPrice,
        String description
) {
}
