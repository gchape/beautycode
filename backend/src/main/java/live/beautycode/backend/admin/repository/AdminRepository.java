package live.beautycode.backend.admin.repository;

import live.beautycode.backend.admin.Admin;
import lombok.RequiredArgsConstructor;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.support.LdapNameBuilder;
import org.springframework.stereotype.Repository;

import javax.naming.Name;
import java.util.Optional;

import static org.springframework.ldap.query.LdapQueryBuilder.query;

@Repository
@RequiredArgsConstructor
public class AdminRepository {

    private final LdapTemplate ldapTemplate;

    public void save(Admin admin) {
        Name dn = LdapNameBuilder.newInstance("ou=admins")
                .add("uid", admin.getUid())
                .build();
        admin.setDn(dn);
        ldapTemplate.create(admin);
    }

    public Optional<Admin> findByEmail(String email) {
        return Optional.of(
                ldapTemplate.findOne(query().where("mail").is(email), Admin.class)
        );
    }

    public boolean existsByEmail(String email) {
        return findByEmail(email).isPresent();
    }
}
