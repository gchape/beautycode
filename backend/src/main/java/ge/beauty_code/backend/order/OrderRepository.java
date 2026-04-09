package ge.beauty_code.backend.order;

import ge.beauty_code.backend.model.items.OrderItem;
import ge.beauty_code.backend.order.dto.OrderDto;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.ConditionalCheckFailedException;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Repository
public class OrderRepository {

    private final DynamoDbClient dynamoDbClient;

    @Autowired
    public OrderRepository(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    public boolean save(@NonNull String userEmail, @NonNull OrderItem orderItem) {
        try {
            dynamoDbClient.putItem(r -> r
                    .tableName("BeautyCode")
                    .item(Map.of(
                            "PK", AttributeValue.fromS("USER#" + userEmail),
                            "SK", AttributeValue.fromS("ORDER#" + orderItem.id()),
                            "OrderId", AttributeValue.fromS(orderItem.id()),
                            "OrderSummary", AttributeValue.fromS(orderItem.summary()),
                            "OrderDate", AttributeValue.fromS(orderItem.date().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    )).conditionExpression(
                            "attribute_exists(PK) AND attribute_not_exists(SK)"
                    )
            );
            return true;
        } catch (ConditionalCheckFailedException e) {
            return false;
        }
    }

    public List<OrderDto> findOrdersByUserEmail(@NonNull String email) {
        return dynamoDbClient.query(r -> r
                        .tableName("BeautyCode")
                        .keyConditionExpression("PK = :pk AND begins_with(SK, :sk)")
                        .expressionAttributeValues(Map.of(
                                ":pk", AttributeValue.fromS("USER#" + email),
                                ":sk", AttributeValue.fromS("ORDER#")
                        ))
                ).items()
                .stream()
                .map(OrderDto::mapToDto)
                .toList();
    }
}
