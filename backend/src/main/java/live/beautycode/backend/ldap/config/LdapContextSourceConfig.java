package live.beautycode.backend.ldap.config;

import live.beautycode.backend.authentication.properties.SpringLdapProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.core.support.LdapContextSource;

@Configuration(
        proxyBeanMethods = false)
@RequiredArgsConstructor
public class LdapContextSourceConfig {

    private final SpringLdapProperties ldapProperties;

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
}
