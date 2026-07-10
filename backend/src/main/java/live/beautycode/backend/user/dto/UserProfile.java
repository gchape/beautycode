package live.beautycode.backend.user.dto;

public record UserProfile(
        String firstName,
        String lastName,
        String email,
        String phone
) {
}
