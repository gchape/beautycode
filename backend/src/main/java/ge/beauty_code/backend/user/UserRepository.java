package ge.beauty_code.backend.user;

import ge.beauty_code.backend.authentication.model.RoleUserDetails;
import ge.beauty_code.backend.user.dto.UserDto;
import ge.beauty_code.backend.user.model.UserItem;
import org.jspecify.annotations.NullMarked;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.ConditionalCheckFailedException;

import java.util.Map;
import java.util.Optional;

@Repository
@NullMarked
public class UserRepository {

    private final String tableName;

    private final DynamoDbClient dynamoDbClient;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserRepository(DynamoDbClient dynamoDbClient,
                          PasswordEncoder passwordEncoder,
                          @Value("${aws.dynamodb.table-name}") String tableName) {
        this.tableName = tableName;
        this.dynamoDbClient = dynamoDbClient;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<UserDto> findUserByEmail(String email) {
        var response = dynamoDbClient.getItem(r -> r
                .tableName(tableName)
                .key(Map.of(
                        "PK", AttributeValue.fromS("USER#" + email),
                        "SK", AttributeValue.fromS("USER#" + email)
                ))
                .projectionExpression("#firstname, #lastname, #email, #phone")
                .expressionAttributeNames(Map.of(
                        "#firstname", "FirstName",
                        "#lastname", "LastName",
                        "#email", "Email",
                        "#phone", "Phone"
                )));

        if (!response.hasItem()) {
            return Optional.empty();
        }

        var item = response.item();

        return Optional.of(UserDto.mapToDto(item));
    }

    public boolean save(UserItem user) {
        try {
            dynamoDbClient.putItem(r -> r
                    .tableName(tableName)
                    .item(Map.of(
                            "PK", AttributeValue.fromS("USER#" + user.email()),
                            "SK", AttributeValue.fromS("USER#" + user.email()),

                            "Type", AttributeValue.fromS("User"),

                            "FirstName", AttributeValue.fromS(user.firstName()),
                            "LastName", AttributeValue.fromS(user.lastName()),
                            "Email", AttributeValue.fromS(user.email()),
                            "Password", AttributeValue.fromS(passwordEncoder.encode(user.password())),
                            "Phone", AttributeValue.fromS(user.phone())
                    ))
                    .conditionExpression("attribute_not_exists(PK)")
            );
            return true;
        } catch (ConditionalCheckFailedException e) {
            return false;
        }
    }

    public Optional<UserDetails> findCredentialsByEmail(String email) {
        var response = dynamoDbClient.getItem(r -> r
                .tableName(tableName)
                .key(Map.of(
                        "PK", AttributeValue.fromS("USER#" + email),
                        "SK", AttributeValue.fromS("USER#" + email)
                ))
                .projectionExpression("#email, #password")
                .expressionAttributeNames(Map.of(
                        "#email", "Email",
                        "#password", "Password"
                )));

        if (!response.hasItem()) {
            return Optional.empty();
        }

        var item = response.item();

        var user = RoleUserDetails.USER.with(item.get("Email").s(), item.get("Password").s());

        return Optional.of(user);
    }

    public boolean contains(String email) {
        return dynamoDbClient.getItem(r -> r
                .tableName(tableName)
                .key(Map.of(
                        "PK", AttributeValue.fromS("USER#" + email),
                        "SK", AttributeValue.fromS("USER#" + email)
                ))
                .projectionExpression("PK")
        ).hasItem();
    }
}
