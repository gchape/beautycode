package live.beautycode.backend.product.dto;

import live.beautycode.backend.product.model.Category;

import java.util.List;

public record ProductDto(
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
