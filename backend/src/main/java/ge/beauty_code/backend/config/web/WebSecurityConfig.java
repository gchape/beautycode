package ge.beauty_code.backend.config.web;

import ge.beauty_code.backend.repository.DynamoDbTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {
    private final DynamoDbTokenRepository dynamoDbTokenRepository;

    @Autowired
    public WebSecurityConfig(DynamoDbTokenRepository dynamoDbTokenRepository) {
        this.dynamoDbTokenRepository = dynamoDbTokenRepository;
    }

    @Bean
    UserDetailsService userDetailsService() {
        return username -> null;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationProvider authenticationProvider() {
        var daoAuthenticationProvider = new DaoAuthenticationProvider(userDetailsService());
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    SecurityFilterChain securityFilterChain(HttpSecurity http) {
        return http.authenticationProvider(authenticationProvider())
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/users").authenticated()
                        .requestMatchers("/orders").authenticated()
                        .requestMatchers("/logout").authenticated()
                        .requestMatchers("/products", "/login").permitAll()
                        .anyRequest().denyAll()
                ).rememberMe(
                        configurer -> configurer
                                .tokenRepository(dynamoDbTokenRepository)
                                .useSecureCookie(true)
                                .tokenValiditySeconds(60 * 60 * 6)
                ).formLogin(
                        configurer -> configurer
                                .loginPage("http://frontend/login")
                                .usernameParameter("email")
                                .passwordParameter("password")
                ).logout(
                        configurer -> configurer
                                .logoutUrl("/logout")
                                .logoutSuccessUrl("http://frontend/")
                                .clearAuthentication(false)
                ).build();
    }
}
