package live.beautycode.backend.config.security;

import live.beautycode.backend.authentication.jwt.JwtAuthenticationFilter;
import live.beautycode.backend.authentication.properties.SpringLdapProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.ldap.LdapBindAuthenticationManagerFactory;
import org.springframework.security.ldap.userdetails.DefaultLdapAuthoritiesPopulator;
import org.springframework.security.ldap.userdetails.LdapAuthoritiesPopulator;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableConfigurationProperties({SpringLdapProperties.class})
public class WebSecurityConfig {

    private static final String USER_SEARCH_BASE = "";
    private static final String USER_SEARCH_FILTER = "(mail={0})";
    private static final String GROUP_SEARCH_BASE = "ou=groups";
    private static final String GROUP_SEARCH_FILTER = "(member={0})";

    private final SpringLdapProperties ldapProperties;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource() {
        var config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost", "http://localhost:5173", "https://beautycode.live"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE"));
        config.setAllowedHeaders(List.of("Content-Type", "Authorization"));
        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    LdapContextSource ldapContextSource() {
        var contextSource = new LdapContextSource();
        contextSource.setUrl(ldapProperties.urls());
        contextSource.setBase(ldapProperties.base());
        contextSource.setUserDn(ldapProperties.username());
        contextSource.setPassword(ldapProperties.password());
        contextSource.afterPropertiesSet();
        return contextSource;
    }

    @Bean
    LdapTemplate ldapTemplate(LdapContextSource ldapContextSource) {
        return new LdapTemplate(ldapContextSource);
    }

    @Bean
    LdapAuthoritiesPopulator ldapAuthoritiesPopulator(LdapContextSource ldapContextSource) {
        var populator = new DefaultLdapAuthoritiesPopulator(
                ldapContextSource,
                GROUP_SEARCH_BASE
        );
        populator.setGroupSearchFilter(GROUP_SEARCH_FILTER);
        return populator;
    }

//    @Bean
//    UserDetailsService userDetailsService() {
//        LdapContextSource ldapContextSource = ldapContextSource();
//        return new LdapUserDetailsService(
//                new FilterBasedLdapUserSearch(USER_SEARCH_BASE, USER_SEARCH_FILTER, ldapContextSource),
//                ldapAuthoritiesPopulator(ldapContextSource)
//        );
//    }

    @Bean
    AuthenticationManager authenticationManager(
            LdapContextSource ldapContextSource,
            LdapAuthoritiesPopulator ldapAuthoritiesPopulator
    ) {
        var factory = new LdapBindAuthenticationManagerFactory(ldapContextSource);
        factory.setUserSearchBase(USER_SEARCH_BASE);
        factory.setUserSearchFilter(USER_SEARCH_FILTER);
        factory.setLdapAuthoritiesPopulator(ldapAuthoritiesPopulator);
        return factory.createAuthenticationManager();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) {
        return http
                .cors(Customizer.withDefaults())

                .csrf(AbstractHttpConfigurer::disable)

                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/users/**").authenticated()
                        .anyRequest().denyAll()
                )

                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((_, res, _) -> res.setStatus(401))
                )

                .build();
    }
}
