package live.beautycode.backend.order.dto;

import java.math.BigDecimal;
import java.util.List;

public record CreateOrderRequest(
        List<OrderItemRequest> items
) {
    public record OrderItemRequest(
            String productId,
            String title,
            String imgUrl,
            String badge,
            BigDecimal newPrice,
            int quantity
    ) {
    }
}
