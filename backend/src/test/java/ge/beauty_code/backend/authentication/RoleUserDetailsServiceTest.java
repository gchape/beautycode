package ge.beauty_code.backend.authentication;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrowsExactly;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RoleUserDetailsServiceTest {

    @Mock
    private DefaultDetailsServiceImpl defaultDetailsService;

    @Mock
    private AdminUserDetailsServiceImpl adminUserDetailsService;

    @InjectMocks
    private RoleUserDetailsService roleUserDetailsService;

    @Test
    void shouldFailWhenUserAndAdminNotExists() {
        var email = "";

        when(defaultDetailsService.loadUserByUsername(email))
                .thenThrow(new UsernameNotFoundException("user not found"));

        when(adminUserDetailsService.loadUserByUsername(email))
                .thenThrow(new UsernameNotFoundException("admin not found"));

        var ex = assertThrowsExactly(
                UsernameNotFoundException.class,
                () -> roleUserDetailsService.loadUserByUsername(email)
        );

        assertEquals("მომხმარებელი მითითებული მონაცემებით ვერ მოიძებნა", ex.getMessage());

        verify(defaultDetailsService).loadUserByUsername(email);
        verify(adminUserDetailsService).loadUserByUsername(email);
        verifyNoMoreInteractions(defaultDetailsService, adminUserDetailsService);
    }

    @Test
    void shouldReturnWhenUserExists() {
        var email = "user@gmail.com";

        var userDetails = User.withUsername(email)
                .password("*".repeat(6))
                .build();

        when(defaultDetailsService.loadUserByUsername(email))
                .thenReturn(userDetails);

        var result = roleUserDetailsService.loadUserByUsername(email);

        assertEquals(userDetails.getUsername(), result.getUsername());
        assertEquals(userDetails.getPassword(), result.getPassword());

        verify(defaultDetailsService).loadUserByUsername(email);
        verifyNoMoreInteractions(defaultDetailsService, adminUserDetailsService);
    }

    @Test
    void shouldReturnWhenAdminExists() {
        var email = "admin@gmail.com";

        var userDetails = User.withUsername(email)
                .password("*".repeat(6))
                .build();

        when(defaultDetailsService.loadUserByUsername(email))
                .thenThrow(new UsernameNotFoundException("user not found"));

        when(adminUserDetailsService.loadUserByUsername(email))
                .thenReturn(userDetails);

        var result = roleUserDetailsService.loadUserByUsername(email);

        assertEquals(userDetails.getUsername(), result.getUsername());
        assertEquals(userDetails.getPassword(), result.getPassword());

        verify(defaultDetailsService).loadUserByUsername(email);
        verify(adminUserDetailsService).loadUserByUsername(email);
        verifyNoMoreInteractions(defaultDetailsService, adminUserDetailsService);
    }
}
