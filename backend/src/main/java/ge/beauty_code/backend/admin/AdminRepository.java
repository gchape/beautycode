package ge.beauty_code.backend.admin;

import ge.beauty_code.backend.authentication.model.RoleUserDetails;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.util.Map;
import java.util.Optional;

@Repository
public class AdminRepository {

    private final String tableName;

    private final DynamoDbClient dynamoDbClient;

    @Autowired
    public AdminRepository(DynamoDbClient dynamoDbClient,
                           @Value("${aws.dynamo_db.table-name}") String tableName) {
        this.tableName = tableName;
        this.dynamoDbClient = dynamoDbClient;
    }

    public Optional<UserDetails> findCredentialsByEmail(@NonNull String email) {
        var response = dynamoDbClient.getItem(r -> r
                .tableName(tableName)
                .key(Map.of(
                        "PK", AttributeValue.fromS("ADMIN#" + email),
                        "SK", AttributeValue.fromS("ADMIN#" + email)
                ))
                .projectionExpression("#email, #password")
                .expressionAttributeNames(Map.of(
                        "#email", "Email",
                        "#password", "Password"
                ))
        );

        if (!response.hasItem()) {
            return Optional.empty();
        }

        var item = response.item();

        var admin = RoleUserDetails.ADMIN.with(item.get("Email").s(), item.get("Password").s());

        return Optional.of(admin);
    }
}
