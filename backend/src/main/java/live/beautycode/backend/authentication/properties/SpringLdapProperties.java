package live.beautycode.backend.authentication.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "spring.ldap")
public record SpringLdapProperties(
        String urls,
        String base,
        String username,
        String password
) {
}
