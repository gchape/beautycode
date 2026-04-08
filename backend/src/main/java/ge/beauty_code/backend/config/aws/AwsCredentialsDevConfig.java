package ge.beauty_code.backend.config.aws;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;

@Profile("dev")
@Configuration(proxyBeanMethods = false)
public class AwsCredentialsDevConfig {
    @Bean
    AwsCredentialsProvider awsCredentialsProviderDev() {
        return StaticCredentialsProvider.create(
                AwsBasicCredentials.create(
                        "local", "local"
                )
        );
    }
}
