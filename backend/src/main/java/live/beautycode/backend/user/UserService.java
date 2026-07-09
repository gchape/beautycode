package live.beautycode.backend.user;

import live.beautycode.backend.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.query.LdapQuery;
import org.springframework.stereotype.Service;

import static org.springframework.ldap.query.LdapQueryBuilder.query;

@Service
@RequiredArgsConstructor
public class UserService {

    private final LdapTemplate ldapTemplate;

    public UserDto findUserByEmail(String email) {
        LdapQuery query = query().where("mail").is(email);

        DirContextOperations ctx = ldapTemplate.searchForContext(query);

        return new UserDto(
                ctx.getStringAttribute("givenName"),
                ctx.getStringAttribute("sn"),
                ctx.getStringAttribute("mail"),
                ctx.getStringAttribute("telephoneNumber")
        );
    }
}
