package live.beautycode.backend.authentication.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "spring.security.jwt")
public record JwtSecretProperties(
        String secret,
        long expirationSeconds
) {
}
