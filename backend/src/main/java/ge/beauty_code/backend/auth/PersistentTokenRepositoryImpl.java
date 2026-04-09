package ge.beauty_code.backend.auth;

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

    private static final String TABLE = "RememberMeTokens";

    private final DynamoDbClient dynamoDbClient;

    public PersistentTokenRepositoryImpl(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    @Override
    public void createNewToken(@NonNull PersistentRememberMeToken token) {
        Map<String, AttributeValue> item = Map.of(
                "series", AttributeValue.fromS(token.getSeries()),
                "email", AttributeValue.fromS(token.getUsername()),
                "tokenValue", AttributeValue.fromS(token.getTokenValue()),
                "lastUsed", AttributeValue.fromS(token.getDate().toInstant().toString()),
                "expiresAt", AttributeValue.fromN(
                        String.valueOf(
                                token.getDate().toInstant().plusSeconds(60 * 60 * 6).getEpochSecond()
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
                .key(Map.of("series", AttributeValue.fromS(series)))
                .updateExpression("SET tokenValue = :tv, lastUsed = :lu")
                .expressionAttributeValues(Map.of(
                        ":tv", AttributeValue.fromS(tokenValue),
                        ":lu", AttributeValue.fromS(lastUsed.toInstant().toString())
                )));
    }

    @Override
    public @Nullable PersistentRememberMeToken getTokenForSeries(@NonNull String seriesId) {
        var response = dynamoDbClient.getItem(r -> r
                .tableName(TABLE)
                .key(Map.of("series", AttributeValue.fromS(seriesId))));

        if (!response.hasItem() || response.item().isEmpty()) {
            return null;
        }

        var item = response.item();

        return new PersistentRememberMeToken(
                item.get("email").s(),
                item.get("series").s(),
                item.get("tokenValue").s(),
                Date.from(Instant.parse(item.get("lastUsed").s()))
        );
    }

    @Override
    public void removeUserTokens(@NonNull String email) {
        var response = dynamoDbClient.query(r -> r
                .tableName(TABLE)
                .indexName("email-index")
                .keyConditionExpression("email = :e")
                .expressionAttributeValues(Map.of(
                        ":e", AttributeValue.fromS(email)
                ))
                .projectionExpression("series"));

        var items = response.items();

        if (items == null || items.isEmpty()) {
            return;
        }

        for (Map<String, AttributeValue> item : items) {
            dynamoDbClient.deleteItem(r -> r
                    .tableName(TABLE)
                    .key(Map.of("series", AttributeValue.fromS(item.get("series").s())))
            );
        }
    }
}
