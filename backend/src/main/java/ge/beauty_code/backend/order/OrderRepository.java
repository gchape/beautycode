package ge.beauty_code.backend.order;

import ge.beauty_code.backend.order.dto.OrderDto;
import ge.beauty_code.backend.order.model.OrderItem;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
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

    private final String tableName;

    public OrderRepository(DynamoDbClient dynamoDbClient,
                           @Value("${aws.dynamo_db.table-name}") String tableName) {
        this.dynamoDbClient = dynamoDbClient;
        this.tableName = tableName;
    }

    public boolean save(@NonNull String userEmail, @NonNull OrderItem orderItem) {
        try {
            dynamoDbClient.putItem(r -> r
                    .tableName(tableName)
                    .item(Map.of(
                            "PK", AttributeValue.fromS("USER#" + userEmail),
                            "SK", AttributeValue.fromS("ORDER#" + orderItem.id()),

                            "Type", AttributeValue.fromS("Order"),

                            "OrderId", AttributeValue.fromS(orderItem.id()),
                            "OrderSummary", AttributeValue.fromS(orderItem.summary()),
                            "OrderDate", AttributeValue.fromS(orderItem.date().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    ))
                    .conditionExpression("attribute_exists(PK) AND attribute_not_exists(SK)")
            );
            return true;
        } catch (ConditionalCheckFailedException e) {
            return false;
        }
    }

    public List<OrderDto> findOrdersByUserEmail(@NonNull String email) {
        return dynamoDbClient.query(r -> r
                        .tableName(tableName)
                        .keyConditionExpression("PK = :pk AND begins_with(SK, :sk)")
                        .expressionAttributeValues(Map.of(
                                ":pk", AttributeValue.fromS("USER#" + email),
                                ":sk", AttributeValue.fromS("ORDER#")
                        )))
                .items()
                .stream()
                .map(OrderDto::mapToDto)
                .toList();
    }
}
