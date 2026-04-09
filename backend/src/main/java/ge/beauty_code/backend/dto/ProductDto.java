package ge.beauty_code.backend.dto;

import ge.beauty_code.backend.model.ProductCategory;

import java.util.List;

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
}
