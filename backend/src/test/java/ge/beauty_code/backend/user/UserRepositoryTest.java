package ge.beauty_code.backend.user;

import ge.beauty_code.backend.user.model.UserItem;
import ge.beauty_code.backend.utils.Secrets;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.localstack.LocalStackContainer;
import org.testcontainers.utility.DockerImageName;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class UserRepositoryTest {

    static LocalStackContainer localStack = new LocalStackContainer(DockerImageName.parse("localstack/localstack"))
            .withServices("dynamodb")
            .withEnv("LOCALSTACK_AUTH_TOKEN", Secrets.readLocalStackAuthToken())
            .withReuse(false);

    static {
        localStack.start();
    }

    @Autowired
    private UserRepository userRepository;

    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry registry) {
        registry.add("spring.cloud.aws.dynamodb.endpoint", () -> localStack.getEndpoint().toString());
        registry.add("spring.cloud.aws.credentials.access-key", localStack::getAccessKey);
        registry.add("spring.cloud.aws.credentials.secret-key", localStack::getSecretKey);
        registry.add("spring.cloud.aws.region.static", () -> "us-east-1");
    }

    @BeforeAll
    static void createTable(@Autowired DynamoDbClient dynamoDbClient) {
        dynamoDbClient.createTable(r -> r
                .tableName("BeautyCode")
                .keySchema(
                        KeySchemaElement.builder().attributeName("PK").keyType(KeyType.HASH).build(),
                        KeySchemaElement.builder().attributeName("SK").keyType(KeyType.RANGE).build()
                )
                .attributeDefinitions(
                        AttributeDefinition.builder().attributeName("PK").attributeType(ScalarAttributeType.S).build(),
                        AttributeDefinition.builder().attributeName("SK").attributeType(ScalarAttributeType.S).build()
                )
                .billingMode(BillingMode.PAY_PER_REQUEST)
        );
    }

    @Test
    void shouldReturnTrueWhenUserIsSaved() {
        var user = new UserItem("Mariam", "Gelashvili", "mariam.gelashvili@gmail.com", "Mariam@2024!", "599123456");
        assertThat(userRepository.save(user)).isTrue();
    }

    @Test
    void shouldReturnFalseWhenUserAlreadyExists() {
        var user = new UserItem("Giorgi", "Beridze", "giorgi.beridze@gmail.com", "Giorgi@2024!", "577234567");
        userRepository.save(user);
        assertThat(userRepository.save(user)).isFalse();
    }

    @Test
    void shouldReturnUserDtoWhenUserExists() {
        var user = new UserItem("Nino", "Kvavilashvili", "nino.kvavilashvili@gmail.com", "Nino@2024!", "598345678");
        userRepository.save(user);

        var result = userRepository.findUserByEmail(user.email());

        assertThat(result).isPresent();
        assertThat(result.get().firstName()).isEqualTo(user.firstName());
        assertThat(result.get().lastName()).isEqualTo(user.lastName());
        assertThat(result.get().email()).isEqualTo(user.email());
        assertThat(result.get().phone()).isEqualTo(user.phone());
    }

    @Test
    void shouldReturnEmptyWhenUserDoesNotExist() {
        assertThat(userRepository.findUserByEmail("ana.maisuradze@gmail.com")).isEmpty();
    }

    @Test
    void shouldReturnCredentialsWhenUserExists() {
        var user = new UserItem("Luka", "Jorbenadze", "luka.jorbenadze@gmail.com", "Luka@2024!", "555456789");
        userRepository.save(user);

        var result = userRepository.findCredentialsByEmail(user.email());

        assertThat(result).isPresent();
        assertThat(result.get().getUsername()).isEqualTo(user.email());
    }

    @Test
    void shouldReturnEmptyCredentialsWhenUserDoesNotExist() {
        assertThat(userRepository.findCredentialsByEmail("tamar.chikvanaia@gmail.com")).isEmpty();
    }
}
