package ge.beauty_code.backend.authentication;

import ge.beauty_code.backend.admin.AdminRepository;
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
class AdminUserDetailsServiceImplTest {

    @Mock
    private AdminRepository adminRepository;

    @InjectMocks
    private AdminUserDetailsServiceImpl adminUserDetailsService;

    @Test
    void shouldThrowWhenAdminUserNotExists() {
        var email = "";

        when(adminRepository.findCredentialsByEmail(email))
                .thenReturn(Optional.empty());

        var ex = assertThrowsExactly(
                UsernameNotFoundException.class,
                () -> adminUserDetailsService.loadUserByUsername(email)
        );

        assertEquals("ადმინისტრატორი Email-ით  ვერ მოიძებნა", ex.getMessage());

        verify(adminRepository).findCredentialsByEmail(email);
    }

    @Test
    void shouldReturnWhenAdminUserExists() {
        var email = "admin@gmail.com";

        var userDetails = User.withUsername(email)
                .password("*".repeat(6))
                .build();

        when(adminRepository.findCredentialsByEmail(email))
                .thenReturn(Optional.of(userDetails));

        var result = adminUserDetailsService.loadUserByUsername(email);

        assertEquals(userDetails.getUsername(), result.getUsername());
        assertEquals(userDetails.getPassword(), result.getPassword());

        verify(adminRepository).findCredentialsByEmail(email);
    }
}
