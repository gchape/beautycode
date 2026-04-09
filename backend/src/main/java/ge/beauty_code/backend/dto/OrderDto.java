package ge.beauty_code.backend.dto;

import java.time.LocalDateTime;

public record OrderDto(
        String id,
        String summary,
        LocalDateTime date
) {
}
