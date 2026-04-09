package ge.beauty_code.backend.config.web;

import ge.beauty_code.backend.repository.DynamoDbTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {
    private final UserDetailsService userDetailsService;
    private final DynamoDbTokenRepository dynamoDbTokenRepository;

    @Autowired
    public WebSecurityConfig(UserDetailsService userDetailsService,
                             DynamoDbTokenRepository dynamoDbTokenRepository) {
        this.userDetailsService = userDetailsService;
        this.dynamoDbTokenRepository = dynamoDbTokenRepository;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationProvider authenticationProvider() {
        var daoAuthenticationProvider = new DaoAuthenticationProvider(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) {
        return http.csrf(AbstractHttpConfigurer::disable)
                .authenticationProvider(authenticationProvider())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/products/**", "/login", "/me").permitAll()
                        .requestMatchers("/users/**", "/orders/**", "/logout").authenticated()
                        .anyRequest().denyAll()
                )
                .rememberMe(rm -> rm
                        .tokenRepository(dynamoDbTokenRepository)
                        .rememberMeParameter("remember-me")
                        .tokenValiditySeconds(60 * 60 * 6)
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .usernameParameter("email")
                        .passwordParameter("password")
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                ).build();
    }
}
