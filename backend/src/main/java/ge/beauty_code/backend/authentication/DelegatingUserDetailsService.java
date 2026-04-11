package ge.beauty_code.backend.authentication;

import ge.beauty_code.backend.admin.AdminRepository;
import ge.beauty_code.backend.user.UserRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class DelegatingUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    private final AdminUserDetailsServiceImpl adminUserDetailsService;

    private final DefaultDetailsServiceImpl defaultDetailsService;

    public DelegatingUserDetailsService(UserRepository userRepository, AdminRepository adminRepository) {
        this.defaultDetailsService = new DefaultDetailsServiceImpl(userRepository);
        this.adminUserDetailsService = new AdminUserDetailsServiceImpl(adminRepository);
        this.userRepository = userRepository;
    }

    @Override
    public @NonNull UserDetails loadUserByUsername(@NonNull String email) throws UsernameNotFoundException {
        if (userRepository.contains(email)) {
            return defaultDetailsService.loadUserByUsername(email);
        }

        return adminUserDetailsService.loadUserByUsername(email);
    }
}
