package live.beautycode.backend;

import live.beautycode.backend.dynamodb.properties.DynamoDbProperties;
import live.beautycode.backend.s3.properties.S3Properties;
import org.springframework.boot.Banner;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;

@SpringBootConfiguration(
        proxyBeanMethods = false)
@ComponentScan(
        basePackages = "live.beautycode.backend")
@EnableAutoConfiguration
@EnableConfigurationProperties(
        value = {DynamoDbProperties.class, S3Properties.class})
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
