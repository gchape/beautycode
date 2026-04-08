package ge.beauty_code.backend.dto;

import org.jspecify.annotations.NonNull;

import java.util.List;

public record UserDto(
        @NonNull String firstName,
        @NonNull String lastName,
        @NonNull String email,
        @NonNull String phone,
        List<OrderDto> orders
) {
}
