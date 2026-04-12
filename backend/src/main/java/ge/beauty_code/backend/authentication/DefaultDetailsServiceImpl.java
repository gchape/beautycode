package ge.beauty_code.backend.authentication;

import ge.beauty_code.backend.user.UserRepository;
import org.jspecify.annotations.NullMarked;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@NullMarked
public class DefaultDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public DefaultDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findCredentialsByEmail(email)
                .orElseThrow(
                        () -> new UsernameNotFoundException("მომხმარებელი Email-ით " + email + " ვერ მოიძებნა")
                );
    }
}
