package ge.beauty_code.backend.service;

import ge.beauty_code.backend.dao.UserDao;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserDao userDao;

    public UserDetailsServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public @NonNull UserDetails loadUserByUsername(@NonNull String email) throws UsernameNotFoundException {
        return userDao.findCredentialsByEmail(email)
                .orElseThrow(
                        () -> new UsernameNotFoundException("მომხმარებელი Email-ით " + email + " ვერ მოიძებნა")
                );
    }
}
