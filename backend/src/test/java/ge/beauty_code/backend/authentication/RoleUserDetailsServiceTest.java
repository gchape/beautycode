package ge.beauty_code.backend.authentication;

import ge.beauty_code.backend.admin.AdminRepository;
import ge.beauty_code.backend.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrowsExactly;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RoleUserDetailsServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AdminRepository adminRepository;

    @InjectMocks
    private RoleUserDetailsService cut;

    @Test
    void shouldThrowWhenNoUserAndAdminExists() {
        var email = "";

        when(userRepository.findCredentialsByEmail(email))
                .thenThrow(new NoSuchElementException());

        when(adminRepository.findCredentialsByEmail(email))
                .thenThrow(new NoSuchElementException());

        var ex = assertThrowsExactly(
                UsernameNotFoundException.class,
                () -> cut.loadUserByUsername(email)
        );

        assertEquals("მომხმარებელი მითითებული მონაცემებით ვერ მოიძებნა", ex.getMessage());

        verify(userRepository).findCredentialsByEmail(email);
        verify(adminRepository).findCredentialsByEmail(email);
    }

    @Test
    void shouldLoadUserWhenUserExists() {
        var email = "user@gmail.com";

        var userDetails = User.withUsername(email)
                .password("*".repeat(6))
                .build();

        when(userRepository.findCredentialsByEmail(email))
                .thenReturn(Optional.of(userDetails));

        var result = cut.loadUserByUsername(email);

        assertEquals(userDetails.getUsername(), result.getUsername());
        assertEquals(userDetails.getPassword(), result.getPassword());

        verify(userRepository).findCredentialsByEmail(email);
    }

    @Test
    void shouldLoadUserWhenAdminExists() {
        var email = "admin@gmail.com";

        var userDetails = User.withUsername(email)
                .password("*".repeat(6))
                .build();

        when(userRepository.findCredentialsByEmail(email))
                .thenThrow(new NoSuchElementException());

        when(adminRepository.findCredentialsByEmail(email))
                .thenReturn(Optional.of(userDetails));

        var result = cut.loadUserByUsername(email);

        assertEquals(userDetails.getUsername(), result.getUsername());
        assertEquals(userDetails.getPassword(), result.getPassword());

        verify(userRepository).findCredentialsByEmail(email);
        verify(adminRepository).findCredentialsByEmail(email);
    }
}
