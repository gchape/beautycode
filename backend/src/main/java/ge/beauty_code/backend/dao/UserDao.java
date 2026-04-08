package ge.beauty_code.backend.dao;

import ge.beauty_code.backend.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.util.Map;

@Repository
public class UserDao {
    private final DynamoDbClient dynamoDbClient;

    @Autowired
    public UserDao(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    public UserDto findUserByEmail(String email) {
        Map<String, AttributeValue> user = dynamoDbClient.getItem(r -> r
                .tableName("BeautyCode")
                .key(Map.of("email", AttributeValue.fromS(email)))
        ).item();

        return new UserDto(
                user.get("FirstName").s(),
                user.get("LastName").s(),
                user.get("Email").s(),
                user.get("Phone").s(),
                null
        );
    }
}
