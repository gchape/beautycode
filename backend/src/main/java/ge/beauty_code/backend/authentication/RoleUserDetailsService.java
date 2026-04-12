package ge.beauty_code.backend.authentication;

import ge.beauty_code.backend.admin.AdminRepository;
import ge.beauty_code.backend.user.UserRepository;
import org.jspecify.annotations.NullMarked;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@NullMarked
public class RoleUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    private final AdminUserDetailsServiceImpl adminUserDetailsService;

    private final DefaultDetailsServiceImpl defaultDetailsService;

    public RoleUserDetailsService(UserRepository userRepository, AdminRepository adminRepository) {
        this.defaultDetailsService = new DefaultDetailsServiceImpl(userRepository);
        this.adminUserDetailsService = new AdminUserDetailsServiceImpl(adminRepository);
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if (userRepository.contains(email)) {
            return defaultDetailsService.loadUserByUsername(email);
        }

        return adminUserDetailsService.loadUserByUsername(email);
    }
}
