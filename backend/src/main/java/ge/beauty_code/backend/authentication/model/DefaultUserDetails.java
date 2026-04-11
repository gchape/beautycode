package ge.beauty_code.backend.authentication.model;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

public enum DefaultUserDetails {

    USER {
        @Override
        public UserDetails with(String email, String password) {
            return User.withUsername(email)
                    .password(password)
                    .accountLocked(false)
                    .accountExpired(false)
                    .roles("USER")
                    .authorities(
                            "USER_READ",
                            "PRODUCT_READ",
                            "ORDER_READ",
                            "ORDER_WRITE"
                    )
                    .build();
        }
    },

    ADMIN {
        @Override
        public UserDetails with(String email, String password) {
            return User.withUsername(email)
                    .password(password)
                    .accountLocked(false)
                    .accountExpired(false)
                    .roles("ADMIN")
                    .authorities(
                            "ROLE_ADMIN",
                            "PRODUCT_READ",
                            "PRODUCT_WRITE",
                            "PRODUCT_UPDATE",
                            "PRODUCT_DELETE",
                            "ORDER_READ",
                            "ORDER_WRITE",
                            "USER_READ",
                            "USER_DELETE"
                    )
                    .build();
        }
    };

    public abstract UserDetails with(String email, String password);
}
