package ge.beauty_code.backend.config.security;

import ge.beauty_code.backend.authentication.RoleUserDetailsService;
import ge.beauty_code.backend.remember_me.PersistentTokenRepositoryImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@Import({PersistentTokenRepositoryImpl.class, RoleUserDetailsService.class})
public class WebSecurityConfig {

    private final PersistentTokenRepository persistentTokenRepository;

    public WebSecurityConfig(PersistentTokenRepository persistentTokenRepository) {
        this.persistentTokenRepository = persistentTokenRepository;
    }

    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource() {
        var config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost", "http://localhost:5173", "https://beauty-code.ge"));

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE"));

        config.setAllowedHeaders(List.of("Content-Type", "Authorization"));

        config.setAllowCredentials(true);

        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService
    ) {
        var provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());

        return new ProviderManager(provider);
    }

    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            AuthenticationManager authenticationManager
    ) {
        return http
                .cors(Customizer.withDefaults())

                .csrf(AbstractHttpConfigurer::disable)

                .authenticationManager(authenticationManager)

                .formLogin(form -> form
                        .loginProcessingUrl("/api/login")
                        .usernameParameter("email")
                        .passwordParameter("password")
                        .successHandler((_, res, _) -> res.setStatus(200))
                        .failureHandler((_, res, _) -> res.setStatus(401))
                )

                .logout(logout -> logout
                        .logoutUrl("/api/logout")
                        .deleteCookies("JSESSIONID", "remember-me")
                        .logoutSuccessHandler((_, res, _) -> res.setStatus(200))
                )

                .rememberMe(rm -> rm
                        .rememberMeParameter("remember-me")
                        .tokenRepository(persistentTokenRepository)
                        .tokenValiditySeconds(PersistentTokenRepositoryImpl.TOKEN_VALIDITY_SECONDS)
                )

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/users/register").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/users/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/users/orders").authenticated()
                        .anyRequest().denyAll()
                )

                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((_, res, _) -> res.setStatus(401))
                )

                .build();
    }
}
