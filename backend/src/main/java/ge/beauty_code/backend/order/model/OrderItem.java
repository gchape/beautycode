package ge.beauty_code.backend.order.model;

import java.time.LocalDateTime;

public record OrderItem(
        String id,
        String summary,
        LocalDateTime date
) {
}
