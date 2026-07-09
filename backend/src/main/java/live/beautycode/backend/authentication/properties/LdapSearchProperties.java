package live.beautycode.backend.authentication.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "ldap")
public record LdapSearchProperties(
        LdapRoleSearch users,
        LdapRoleSearch admins,
        String groupSearchBase,
        String groupSearchFilter
) {
    public record LdapRoleSearch(
            String searchBase,
            String searchFilter
    ) {
    }
}
