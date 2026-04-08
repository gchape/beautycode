package ge.beauty_code.backend.config.aws;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;

@Profile("prod")
@Configuration(proxyBeanMethods = false)
public class AwsCredentialsProdConfig {
    @Bean
    AwsCredentialsProvider awsCredentialsProviderProd() {
        return DefaultCredentialsProvider.builder().build();
    }
}
