package ge.beauty_code.backend.model.items;

import java.time.LocalDateTime;

public record OrderItem(
        String id,
        String summary,
        LocalDateTime date
) {
}
