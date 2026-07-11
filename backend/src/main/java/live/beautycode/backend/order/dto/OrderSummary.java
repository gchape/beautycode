package live.beautycode.backend.order.dto;

public record OrderSummary(
        String id,
        String status,
        double total,
        String createdAt
) {
}
