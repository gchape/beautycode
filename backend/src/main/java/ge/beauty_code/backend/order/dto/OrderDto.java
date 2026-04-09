package ge.beauty_code.backend.order.dto;

import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public record OrderDto(
        String id,
        String summary,
        LocalDateTime date
) {
    public static OrderDto mapToDto(Map<String, AttributeValue> item) {
        return new OrderDto(
                item.get("OrderId").s(),
                item.get("OrderSummary").s(),
                LocalDateTime.parse(item.get("OrderDate").s(), DateTimeFormatter.ISO_LOCAL_DATE_TIME)
        );
    }
}
