package ge.beauty_code.backend.user.dto;

import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.util.Map;

public record UserDto(
        String firstName,
        String lastName,
        String email,
        String phone
) {
    public static UserDto mapToDto(Map<String, AttributeValue> item) {
        return new UserDto(
                item.get("FirstName").s(),
                item.get("LastName").s(),
                item.get("Email").s(),
                item.get("Phone").s()
        );
    }
}
