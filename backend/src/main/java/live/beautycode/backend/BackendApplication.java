package live.beautycode.backend;

import live.beautycode.backend.dynamodb.properties.DynamoDbProperties;
import org.springframework.boot.Banner;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.ldap.repository.config.EnableLdapRepositories;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootConfiguration(
        proxyBeanMethods = false)
@ComponentScan(
        basePackages = "live.beautycode.backend")
@EnableAutoConfiguration
@EnableConfigurationProperties(
        value = {DynamoDbProperties.class})
@EnableLdapRepositories
@EnableAsync
public class BackendApplication {

    static void main(String[] args) {
        new SpringApplicationBuilder()
                .sources(BackendApplication.class)
                .bannerMode(Banner.Mode.OFF)
                .web(WebApplicationType.SERVLET)
                .logStartupInfo(false)
                .headless(false)
                .build(args)
                .run();
    }
}
