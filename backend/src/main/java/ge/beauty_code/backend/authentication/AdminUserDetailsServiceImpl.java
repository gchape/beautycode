package ge.beauty_code.backend.authentication;

import ge.beauty_code.backend.admin.AdminRepository;
import org.jspecify.annotations.NullMarked;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@NullMarked
public class AdminUserDetailsServiceImpl implements UserDetailsService {

    private final AdminRepository adminRepository;

    public AdminUserDetailsServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return adminRepository.findCredentialsByEmail(email)
                .orElseThrow(
                        () -> new UsernameNotFoundException("ადმინისტრატორი Email-ით " + email + " ვერ მოიძებნა")
                );
    }
}
