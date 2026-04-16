package ge.beauty_code.backend.user;

import ge.beauty_code.backend.exception.UserNotFoundException;
import ge.beauty_code.backend.user.dto.UserDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @Test
    @WithMockUser(username = "test@mail.com")
    void shouldReturnNotFoundStatusCodeWhenNoUserExists() throws Exception {
        var email = "test@mail.com";

        when(userService.findUserByEmail(email))
                .thenThrow(new UserNotFoundException("მომხმარებელი Email-ით " + email + " ვერ მოიძებნა"));

        mockMvc.perform(get("/api/users/profile")
                        .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andDo(print());
    }

    @Test
    @WithMockUser(username = "any@gmail.com")
    void shouldRespondWithUserDtoWhenUserExists() throws Exception {
        var email = "any@gmail.com";

        var userDto = new UserDto(
                "John",
                "Doe",
                email,
                "599000000"
        );

        when(userService.findUserByEmail(email))
                .thenReturn(userDto);

        mockMvc.perform(get("/api/users/profile")
                        .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.password").doesNotExist())
                .andExpect(jsonPath("$.phone").value("599000000"))
                .andDo(print());
    }
}
