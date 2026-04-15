package ge.beauty_code.backend.authentication;

import ge.beauty_code.backend.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrowsExactly;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DefaultDetailsServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private DefaultDetailsServiceImpl defaultDetailsService;

    @Test
    void shouldThrowWhenUserNotExists() {
        var email = "";

        when(userRepository.findCredentialsByEmail(email))
                .thenReturn(Optional.empty());

        var ex = assertThrowsExactly(
                UsernameNotFoundException.class,
                () -> defaultDetailsService.loadUserByUsername(email)
        );

        assertEquals("მომხმარებელი Email-ით  ვერ მოიძებნა", ex.getMessage());

        verify(userRepository).findCredentialsByEmail(email);
    }

    @Test
    void shouldReturnWhenUserExists() {
        var email = "user@gmail.com";

        var userDetails = User.withUsername(email)
                .password("*".repeat(6))
                .build();

        when(userRepository.findCredentialsByEmail(email))
                .thenReturn(Optional.of(userDetails));

        var result = defaultDetailsService.loadUserByUsername(email);

        assertEquals(userDetails.getUsername(), result.getUsername());
        assertEquals(userDetails.getPassword(), result.getPassword());

        verify(userRepository).findCredentialsByEmail(email);
    }
}
