package live.beautycode.backend.embedded;

import jakarta.annotation.PreDestroy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;
import software.amazon.dynamodb.services.local.embedded.DynamoDBEmbedded;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@Configuration
@Profile("dev")
public class EmbeddedDynamoDbConfig {

    private static final String TABLE_NAME = "BeautyCode";

    private DynamoDbClient client;

    @Bean
    public DynamoDbClient dynamoDbClient() {
        client = DynamoDBEmbedded.create().dynamoDbClient();
        createTable();
        seedData();
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
                .tableName(TABLE_NAME)
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

    private void seedData() {
        for (Map<String, AttributeValue> item : products()) {
            client.putItem(PutItemRequest.builder().tableName(TABLE_NAME).item(item).build());
        }
    }

    private AttributeValue s(String v) {
        return AttributeValue.builder().s(v).build();
    }

    private AttributeValue n(String v) {
        return AttributeValue.builder().n(v).build();
    }

    private AttributeValue l(String... features) {
        return AttributeValue.builder().l(
                Stream.of(features).map(this::s).toList()
        ).build();
    }

    private Map<String, AttributeValue> product(String pk, String badge, String category, String discount,
                                                String[] features, String id, String imgUrl,
                                                String newPrice, String oldPrice, String title) {
        Map<String, AttributeValue> item = new HashMap<>();
        item.put("PK", s(pk));
        item.put("SK", s(pk));
        item.put("Badge", s(badge));
        item.put("Category", s(category));
        item.put("Discount", n(discount));
        item.put("Features", l(features));
        item.put("Id", n(id));
        item.put("ImgUrl", s(imgUrl));
        item.put("NewPrice", n(newPrice));
        item.put("OldPrice", n(oldPrice));
        item.put("Title", s(title));
        item.put("Type", s("Product"));
        return item;
    }

    private List<Map<String, AttributeValue>> products() {
        return List.of(
                product("PRODUCT#A194YH2N8DA26CG", "Bestseller", "epilator", "70",
                        new String[]{
                                "✨ უსაფრთხო და უმტკივნეულო პროცედურა.",
                                "⚡ 1 მილიონი იმპულსი, 10 წელი საკმარისია",
                                "🌠 სახლში მარტივად – აღარ დაგჭირდებათ სალონში ძვირადღირებული პროცედურები!",
                                "🪐 სწრაფი და ეფექტური – ყველა ტიპის თმას ხედავს!"
                        },
                        "2", "/images/2_ewk11d.webp", "149", "570",
                        "BeautiyCode-ის 🌸 ლაზერული ეპილატორი, რომელიც გაგანთავისუფლებთ არასასურველი თმისგან."
                ),

                product("PRODUCT#A194YH2N8DA26D0", "Styling", "hair-dryer", "50",
                        new String[]{
                                "⏰ მხოლოდ 119 ლარად",
                                "✔️ გარანტია 5 წელი",
                                "🌟 💖 დაისონის კლონი, მულტიფუნქციური ფენით",
                                "🚚 უფასო საკურერო მომსახურება მთელი საქართველოს მასშტაბით!"
                        },
                        "4", "/images/4_j0ylif.webp", "119", "240",
                        "BeautiyCode-ის თმის ფენ-სავარცხელი 🎁 მიიღე სალონური შედეგი სახლის პირობებში!"
                ),

                product("PRODUCT#A194YH2N8DA26C8", "New Arrival", "facial-cleanser", "50",
                        new String[]{
                                "✔ ეფექტურად აშორებს შავ წერტილებს",
                                "✔ წმენდს ღრმად ფორებს",
                                "✔ ამცირებს ცხიმის გამოყოფას",
                                "✔ აუმჯობესებს კანის ტექსტურას და ბზინვარებას",
                                "📦 მოიპოვე საოცარი შედეგი სახლის პირობებში — სალონის გარეშე!"
                        },
                        "1", "/images/1_nlzxyl.webp", "149", "300",
                        "BeautiyCode-ის 💎 ახალი თაობის ვაკუუმის აპარატი — თქვენი კანის სუფთა და ჯანსაღი იერსახისთვის!"
                ),

                product("PRODUCT#A194YH2N8DA26DR", "New Arrival", "facial-cleanser", "50",
                        new String[]{
                                "🌸 აქრობს შავ წერტილებს, ჭარბ ცხიმს და წმენდს ფორებს.",
                                "💫 აჯანსაღებს და აახალგაზრდავებს სახის კანს.",
                                "✅ გამოიყენება ყველა ტიპის კანზე. აქრობს აკნესა და გამონაყარს.",
                                "💎 პროფესიონალური შედეგი სალონის გარეშე."
                        },
                        "7", "/images/7_fj1dgf.webp", "109", "220",
                        "BeautiyCode-ის სახის ვაკუუმ აპარატი ✨ დაივიწყეთ შავი წერტილები სამუდამოდ!"
                ),

                product("PRODUCT#A194YH2N8DA26D8", "Styling", "hair-dryer", "50",
                        new String[]{
                                "⏰ მხოლოდ 119 ლარად",
                                "✔️ გარანტია 5 წელი",
                                "🌟 💖 დაისონის კლონი, მულტიფუნქციური ფენით",
                                "🚚 უფასო საკურერო მომსახურება მთელი საქართველოს მასშტაბით!"
                        },
                        "5", "/images/5_l3arnw.webp", "119", "240",
                        "BeautiyCode-ის თმის ფენ-სავარცხელი 🎁 მიიღე სალონური შედეგი სახლის პირობებში!"
                ),

                product("PRODUCT#A194YH2N8DA26CR", "Styling", "hair-dryer", "50",
                        new String[]{
                                "⏰ მხოლოდ 119 ლარად",
                                "✔️ გარანტია 5 წელი",
                                "🌟 💖 დაისონის კლონი, მულტიფუნქციური ფენით",
                                "🚚 უფასო საკურერო მომსახურება მთელი საქართველოს მასშტაბით!"
                        },
                        "3", "/images/3_zaqfcm.webp", "119", "240",
                        "BeautiyCode-ის თმის ფენ-სავარცხელი 🎁 მიიღე სალონური შედეგი სახლის პირობებში!"
                ),

                product("PRODUCT#A194YH2N8DA26DG", "Premium", "epilator", "60",
                        new String[]{
                                "• სიმძლავრის რეგულირების 𝟵 დონე",
                                "• მოყინვის ფუნქცია + აქტიური გაგრილება",
                                "• კანის ავტომატური ამომცნობი სენსორი",
                                "• გამოიყენება სხეულის ნებისმიერ ადგილზე",
                                "• მუშაობის 𝟮 რეჟიმი - ავტომატური და ხელით მართვა"
                        },
                        "6", "/images/6_r92zyt.webp", "379", "700",
                        "BeautiyCode-ის ✨ პრემიუმ კატეგორიის 𝗜𝗣𝗟 ლაზერული ეპილატორი💜"
                )
        );
    }
}
