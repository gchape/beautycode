package live.beautycode.backend.user.repository;

import live.beautycode.backend.user.User;
import org.springframework.data.ldap.repository.LdapRepository;

import java.util.Optional;

public interface UserRepository extends LdapRepository<User> {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
