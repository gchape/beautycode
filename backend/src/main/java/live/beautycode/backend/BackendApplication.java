package live.beautycode.backend;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.ComponentScan;

@SpringBootConfiguration(proxyBeanMethods = false)
@ComponentScan(basePackages = "live.beautycode.backend")
@EnableAutoConfiguration
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
