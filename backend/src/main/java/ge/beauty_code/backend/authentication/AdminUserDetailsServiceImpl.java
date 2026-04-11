package ge.beauty_code.backend.authentication;

import ge.beauty_code.backend.admin.AdminRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AdminUserDetailsServiceImpl implements UserDetailsService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminUserDetailsServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public @NonNull UserDetails loadUserByUsername(@NonNull String email) throws UsernameNotFoundException {
        return adminRepository.findCredentialsByEmail(email)
                .orElseThrow(
                        () -> new UsernameNotFoundException("ადმინისტრატორი Email-ით " + email + " ვერ მოიძებნა")
                );
    }
}
