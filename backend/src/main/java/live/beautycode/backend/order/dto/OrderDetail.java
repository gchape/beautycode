package live.beautycode.backend.order.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderDetail(
        String id,
        String status,
        BigDecimal total,
        Instant createdAt,
        List<OrderItemDetail> items
) {
    public record OrderItemDetail(
            String productId,
            String title,
            String imgUrl,
            String badge,
            BigDecimal unitPrice,
            int quantity
    ) {
    }
}
