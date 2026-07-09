package ge.beauty_code.backend;

import ge.beauty_code.backend.exception.GlobalExceptionHandler;
import org.springframework.boot.Banner;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.context.ConfigurationPropertiesAutoConfiguration;
import org.springframework.boot.autoconfigure.jmx.JmxAutoConfiguration;
import org.springframework.boot.autoconfigure.task.TaskExecutionAutoConfiguration;
import org.springframework.boot.autoconfigure.task.TaskSchedulingAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@SpringBootConfiguration(proxyBeanMethods = false)
@EnableAutoConfiguration(exclude = {
        JmxAutoConfiguration.class,
        TaskExecutionAutoConfiguration.class,
        TaskSchedulingAutoConfiguration.class,
        ConfigurationPropertiesAutoConfiguration.class,
})
@ComponentScan(basePackages = {
        "ge.beauty_code.backend.user",
        "ge.beauty_code.backend.admin",
        "ge.beauty_code.backend.product",
        "ge.beauty_code.backend.order",
        "ge.beauty_code.backend.config",
})
@Import(GlobalExceptionHandler.class)
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
