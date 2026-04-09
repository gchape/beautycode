package ge.beauty_code.backend.user;

import ge.beauty_code.backend.model.items.UserItem;
import ge.beauty_code.backend.user.dto.UserDto;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.ConditionalCheckFailedException;

import java.util.Map;
import java.util.Optional;

@Repository
public class UserRepository {

    private final DynamoDbClient dynamoDbClient;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserRepository(DynamoDbClient dynamoDbClient,
                          PasswordEncoder passwordEncoder) {
        this.dynamoDbClient = dynamoDbClient;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<UserDto> findUserByEmail(@NonNull String email) {
        var user = dynamoDbClient.getItem(r -> r
                .tableName("BeautyCode")
                .key(Map.of(
                        "PK", AttributeValue.fromS("USER#" + email),
                        "SK", AttributeValue.fromS("USER#" + email)
                )).projectionExpression(
                        "#firstname, #lastname, #email, #phone"
                ).expressionAttributeNames(Map.of(
                        "#firstname", "FirstName",
                        "#lastname", "LastName",
                        "#email", "Email",
                        "#phone", "Phone"
                ))
        ).item();

        if (user.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(UserDto.mapToDto(user));
    }

    public boolean save(@NonNull UserItem user) {
        try {
            dynamoDbClient.putItem(r -> r
                    .tableName("BeautyCode")
                    .item(Map.of(
                            "PK", AttributeValue.fromS("USER#" + user.email()),
                            "SK", AttributeValue.fromS("USER#" + user.email()),
                            "FirstName", AttributeValue.fromS(user.firstName()),
                            "LastName", AttributeValue.fromS(user.lastName()),
                            "Email", AttributeValue.fromS(user.email()),
                            "Password", AttributeValue.fromS(passwordEncoder.encode(user.password())),
                            "Phone", AttributeValue.fromS(user.phone())
                    )).conditionExpression(
                            "attribute_not_exists(PK)"
                    )
            );
            return true;
        } catch (ConditionalCheckFailedException e) {
            return false;
        }
    }

    public Optional<UserDetails> findCredentialsByEmail(@NonNull String email) {
        var item = dynamoDbClient.getItem(r -> r
                .tableName("BeautyCode")
                .key(Map.of(
                        "PK", AttributeValue.fromS("USER#" + email),
                        "SK", AttributeValue.fromS("USER#" + email)
                )).projectionExpression(
                        "#email, #password"
                ).expressionAttributeNames(Map.of(
                        "#email", "Email",
                        "#password", "Password"
                ))
        ).item();

        if (item.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(User.withUsername(item.get("Email").s())
                .password(item.get("Password").s())
                .build());
    }
}
