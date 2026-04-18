package ge.beauty_code.backend.user;

import ge.beauty_code.backend.exception.UserNotFoundException;
import ge.beauty_code.backend.user.dto.UserDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.assertj.MockMvcTester;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @MockitoBean
    private UserService userService;

    @Autowired
    private MockMvcTester mockMvcTester;

    @Test
    @WithMockUser(username = "test@mail.com")
    void shouldReturnNotFoundStatusCodeWhenNoUserExists() {
        var email = "test@mail.com";

        when(userService.findUserByEmail(email))
                .thenThrow(new UserNotFoundException("მომხმარებელი Email-ით " + email + " ვერ მოიძებნა"));

        mockMvcTester.get()
                .uri("/api/users/profile")
                .accept(MediaType.APPLICATION_JSON)
                .assertThat()
                .hasStatus(HttpStatus.NOT_FOUND);
    }

    @Test
    void shouldRespondWithUserDtoWhenUserExists() {
        var email = "any@gmail.com";

        var userDto = new UserDto(
                "John",
                "Doe",
                email,
                "599000000"
        );

        when(userService.findUserByEmail(email))
                .thenReturn(userDto);

        mockMvcTester.get()
                .uri("/api/users/profile")
                .with(user(email))
                .accept(MediaType.APPLICATION_JSON)
                .assertThat()
                .hasStatusOk()
                .bodyJson()
                .doesNotHavePath("password")
                .hasPath("email")
                .hasPath("lastName")
                .hasPath("firstName")
                .hasPath("phone");
    }
}
