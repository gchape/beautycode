package live.beautycode.backend.authentication.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt")
public record JwtSecretConfigurationProperties(
        String secret,
        long expirationSeconds
) {
}
