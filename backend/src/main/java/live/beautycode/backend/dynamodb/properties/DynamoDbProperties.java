package live.beautycode.backend.dynamodb.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "spring.cloud.aws.dynamodb")
public record DynamoDbProperties(
        String tableName
) {
}
