package ge.beauty_code.backend.dto;

import ge.beauty_code.backend.model.ProductCategory;
import org.jspecify.annotations.NonNull;

import java.util.List;

public record ProductDto(
        @NonNull String id,
        @NonNull String title,
        @NonNull String badge,
        @NonNull String imageUrl,
        @NonNull ProductCategory category,
        @NonNull List<String> features,
        double discount,
        double oldPrice,
        double newPrice
) {
}
