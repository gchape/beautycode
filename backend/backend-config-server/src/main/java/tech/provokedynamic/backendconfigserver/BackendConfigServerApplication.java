package tech.provokedynamic.backendconfigserver;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.context.annotation.ComponentScan;

@SpringBootConfiguration(
        proxyBeanMethods = false)
@EnableAutoConfiguration
@ComponentScan(
        basePackages = "tech.provokedynamic.backendconfigserver.config")
@EnableConfigServer
public class BackendConfigServerApplication {

    static void main(String[] args) {
        new SpringApplicationBuilder()
                .sources(BackendConfigServerApplication.class)
                .headless(true)
                .logStartupInfo(false)
                .web(WebApplicationType.SERVLET)
                .bannerMode(Banner.Mode.OFF)
                .build(args)
                .run();
    }
}
