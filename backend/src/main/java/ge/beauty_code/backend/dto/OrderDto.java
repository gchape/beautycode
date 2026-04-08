package ge.beauty_code.backend.dto;

import org.jspecify.annotations.NonNull;

import java.time.LocalDateTime;

public record OrderDto(
        @NonNull String id,
        @NonNull LocalDateTime date,
        @NonNull String summary
) {
}
