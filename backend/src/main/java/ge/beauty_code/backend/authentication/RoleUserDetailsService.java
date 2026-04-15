package ge.beauty_code.backend.authentication;

import org.jspecify.annotations.NullMarked;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Primary
@Import({DefaultDetailsServiceImpl.class, AdminUserDetailsServiceImpl.class})
public @NullMarked class RoleUserDetailsService implements UserDetailsService {

    private final DefaultDetailsServiceImpl defaultDetailsService;
    private final AdminUserDetailsServiceImpl adminUserDetailsService;

    public RoleUserDetailsService(
            DefaultDetailsServiceImpl defaultDetailsService,
            AdminUserDetailsServiceImpl adminUserDetailsService
    ) {
        this.defaultDetailsService = defaultDetailsService;
        this.adminUserDetailsService = adminUserDetailsService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            return defaultDetailsService.loadUserByUsername(email);
        } catch (UsernameNotFoundException ignored) {
        }
        try {
            return adminUserDetailsService.loadUserByUsername(email);
        } catch (UsernameNotFoundException ignored) {
        }

        throw new UsernameNotFoundException("მომხმარებელი მითითებული მონაცემებით ვერ მოიძებნა");
    }
}
