package ge.beauty_code.backend.user.model;

public record UserItem(
        String firstName,
        String lastName,
        String email,
        String password,
        String phone) {
}
