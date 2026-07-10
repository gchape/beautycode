package live.beautycode.backend.user.repository;

import live.beautycode.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.support.LdapNameBuilder;
import org.springframework.stereotype.Repository;

import javax.naming.Name;
import java.util.Optional;

import static org.springframework.ldap.query.LdapQueryBuilder.query;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final LdapTemplate ldapTemplate;

    public void save(User user) {
        Name dn = LdapNameBuilder.newInstance("ou=users")
                .add("uid", user.getUid())
                .build();
        user.setDn(dn);
        ldapTemplate.create(user);
    }

    public Optional<User> findByEmail(String email) {
        return Optional.of(
                ldapTemplate.findOne(query().where("mail").is(email), User.class)
        );
    }

    public boolean existsByEmail(String email) {
        return findByEmail(email).isPresent();
    }
}
