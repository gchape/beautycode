package live.beautycode.backend.dynamodb.config;

import jakarta.annotation.PreDestroy;
import live.beautycode.backend.dynamodb.properties.DynamoDbProperties;
import live.beautycode.backend.dynamodb.seeder.ProductSeeder;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;
import software.amazon.dynamodb.services.local.embedded.DynamoDBEmbedded;

@Configuration
@Profile("dev")
@RequiredArgsConstructor
public class EmbeddedDynamoDbConfig {

    private final DynamoDbProperties dynamoDbProperties;

    private DynamoDbClient client;

    @Bean
    public DynamoDbClient dynamoDbClient() {
        client = DynamoDBEmbedded.create().dynamoDbClient();
        createTable();
        new ProductSeeder(client, dynamoDbProperties.tableName()).seed();
        return client;
    }

    @PreDestroy
    public void close() {
        if (client != null) {
            client.close();
        }
    }

    private void createTable() {
        client.createTable(CreateTableRequest.builder()
                .tableName(dynamoDbProperties.tableName())
                .attributeDefinitions(
                        AttributeDefinition.builder().attributeName("PK").attributeType(ScalarAttributeType.S).build(),
                        AttributeDefinition.builder().attributeName("SK").attributeType(ScalarAttributeType.S).build(),
                        AttributeDefinition.builder().attributeName("Type").attributeType(ScalarAttributeType.S).build(),
                        AttributeDefinition.builder().attributeName("Category").attributeType(ScalarAttributeType.S).build()
                )
                .keySchema(
                        KeySchemaElement.builder().attributeName("PK").keyType(KeyType.HASH).build(),
                        KeySchemaElement.builder().attributeName("SK").keyType(KeyType.RANGE).build()
                )
                .globalSecondaryIndexes(
                        GlobalSecondaryIndex.builder()
                                .indexName("ProductsByType")
                                .keySchema(KeySchemaElement.builder().attributeName("Type").keyType(KeyType.HASH).build())
                                .projection(Projection.builder().projectionType(ProjectionType.ALL).build())
                                .provisionedThroughput(ProvisionedThroughput.builder()
                                        .readCapacityUnits(5L).writeCapacityUnits(5L).build())
                                .build(),
                        GlobalSecondaryIndex.builder()
                                .indexName("ProductsByCategory")
                                .keySchema(KeySchemaElement.builder().attributeName("Category").keyType(KeyType.HASH).build())
                                .projection(Projection.builder().projectionType(ProjectionType.ALL).build())
                                .provisionedThroughput(ProvisionedThroughput.builder()
                                        .readCapacityUnits(5L).writeCapacityUnits(5L).build())
                                .build()
                )
                .provisionedThroughput(ProvisionedThroughput.builder()
                        .readCapacityUnits(5L).writeCapacityUnits(5L).build())
                .build());
    }
}
