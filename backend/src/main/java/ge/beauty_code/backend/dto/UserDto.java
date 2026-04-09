package ge.beauty_code.backend.dto;

public record UserDto(
        String firstName,
        String lastName,
        String email,
        String phone
) {
}
