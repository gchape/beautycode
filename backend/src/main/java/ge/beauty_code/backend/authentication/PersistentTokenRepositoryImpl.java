package ge.beauty_code.backend.authentication;

import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Repository
public class PersistentTokenRepositoryImpl implements PersistentTokenRepository {

    public static final int TOKEN_VALIDITY_SECONDS = 6 * 60 * 60;

    private static final String TABLE = "RememberMeTokens";

    private final DynamoDbClient dynamoDbClient;

    public PersistentTokenRepositoryImpl(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    @Override
    public void createNewToken(@NonNull PersistentRememberMeToken token) {
        Map<String, AttributeValue> item = Map.of(
                "Series", AttributeValue.fromS(token.getSeries()),
                "Email", AttributeValue.fromS(token.getUsername()),
                "TokenValue", AttributeValue.fromS(token.getTokenValue()),
                "LastUsed", AttributeValue.fromS(token.getDate().toInstant().toString()),
                "ExpiresAt", AttributeValue.fromN(
                        String.valueOf(
                                token.getDate().toInstant().plusSeconds(TOKEN_VALIDITY_SECONDS).getEpochSecond()
                        )
                )
        );
        dynamoDbClient.putItem(r -> r
                .tableName(TABLE)
                .item(item)
        );
    }

    @Override
    public void updateToken(@NonNull String series, @NonNull String tokenValue, @NonNull Date lastUsed) {
        dynamoDbClient.updateItem(r -> r
                .tableName(TABLE)
                .key(Map.of("Series", AttributeValue.fromS(series)))
                .conditionExpression("attribute_exists(Series)")
                .updateExpression("SET TokenValue = :tv, LastUsed = :lu, ExpiresAt = :ea")
                .expressionAttributeValues(Map.of(
                        ":tv", AttributeValue.fromS(tokenValue),
                        ":lu", AttributeValue.fromS(lastUsed.toInstant().toString()),
                        ":ea", AttributeValue.fromN(
                                String.valueOf(
                                        lastUsed.toInstant().plusSeconds(TOKEN_VALIDITY_SECONDS).getEpochSecond()
                                )
                        )
                ))
        );
    }

    @Override
    public @Nullable PersistentRememberMeToken getTokenForSeries(@NonNull String seriesId) {
        var response = dynamoDbClient.getItem(r -> r
                .tableName(TABLE)
                .key(Map.of("Series", AttributeValue.fromS(seriesId)))
        );

        if (!response.hasItem()) {
            return null;
        }

        var item = response.item();
        return new PersistentRememberMeToken(
                item.get("Email").s(),
                item.get("Series").s(),
                item.get("TokenValue").s(),
                Date.from(Instant.parse(item.get("LastUsed").s()))
        );
    }

    @Override
    public void removeUserTokens(@NonNull String email) {
        var response = dynamoDbClient.query(r -> r
                .tableName(TABLE)
                .indexName("TokensByEmail")
                .keyConditionExpression("Email = :e")
                .expressionAttributeValues(Map.of(
                        ":e", AttributeValue.fromS(email)
                ))
                .projectionExpression("Series")
        );

        if (!response.hasItems()) {
            return;
        }

        for (Map<String, AttributeValue> item : response.items()) {
            dynamoDbClient.deleteItem(r -> r
                    .tableName(TABLE)
                    .key(Map.of("Series", AttributeValue.fromS(item.get("Series").s())))
            );
        }
    }
}
