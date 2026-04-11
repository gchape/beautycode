package ge.beauty_code.backend.config.security;

import ge.beauty_code.backend.authentication.PersistentTokenRepositoryImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class WebSecurityConfig {

    private final List<UserDetailsService> userDetailsServices;
    private final PersistentTokenRepository persistentTokenRepository;

    public WebSecurityConfig(
            List<UserDetailsService> userDetailsServices,
            PersistentTokenRepository persistentTokenRepository
    ) {
        this.userDetailsServices = userDetailsServices;
        this.persistentTokenRepository = persistentTokenRepository;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(
                new DaoAuthenticationProvider(userDetailsServices.getFirst()),
                new DaoAuthenticationProvider(userDetailsServices.getLast())
        );
    }

    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        var config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "https://beauty-code.ge"
        ));

        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "PATCH", "DELETE"
        ));

        config.setAllowedHeaders(List.of(
                "Content-Type",
                "X-API-Version",
                "X-XSRF-TOKEN"
        ));

        config.setAllowCredentials(true);

        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) {
        return http
                .csrf(CsrfConfigurer::spa)
                .cors(Customizer.withDefaults())
                .authenticationManager(authenticationManager())

                .formLogin(form -> form
                        .loginProcessingUrl("/api/login")
                        .usernameParameter("email")
                        .passwordParameter("password")
                        .defaultSuccessUrl("/api/me", true)
                )

                .logout(logout -> logout
                        .logoutUrl("/api/logout")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID", "remember-me")
                )

                .rememberMe(rm -> rm
                        .tokenRepository(persistentTokenRepository)
                        .rememberMeParameter("remember-me")
                        .tokenValiditySeconds(PersistentTokenRepositoryImpl.TOKEN_VALIDITY_SECONDS)
                )

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/login").permitAll()
                        .requestMatchers("/api/products/**").permitAll()
                        .requestMatchers("/api/me").authenticated()
                        .requestMatchers("/api/users/**").authenticated()
                        .requestMatchers("/api/orders/**").authenticated()
                        .anyRequest().denyAll()
                )

                .build();
    }
}
