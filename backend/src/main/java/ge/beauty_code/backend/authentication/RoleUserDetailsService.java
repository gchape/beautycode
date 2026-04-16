package ge.beauty_code.backend.authentication;

import ge.beauty_code.backend.admin.AdminRepository;
import ge.beauty_code.backend.user.UserRepository;
import org.jspecify.annotations.NullMarked;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public @NullMarked class RoleUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    private final AdminRepository adminRepository;

    public RoleUserDetailsService(
            AdminRepository adminRepository,
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            return userRepository.findCredentialsByEmail(email).orElseThrow();
        } catch (NoSuchElementException _) {
        }
        try {
            return adminRepository.findCredentialsByEmail(email).orElseThrow();
        } catch (NoSuchElementException _) {
        }

        throw new UsernameNotFoundException("მომხმარებელი მითითებული მონაცემებით ვერ მოიძებნა");
    }
}
