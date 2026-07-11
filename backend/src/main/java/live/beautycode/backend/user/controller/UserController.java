package live.beautycode.backend.user.controller;

import live.beautycode.backend.user.dto.RegisterRequest;
import live.beautycode.backend.user.dto.UserProfile;
import live.beautycode.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(
        path = "/api/users",
        produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterRequest request) {
        userService.register(request);
    }

    @GetMapping(value = "/profile")
    public UserProfile getUserProfile(Authentication authentication) {
        return userService.findUserByEmail(authentication.getName());
    }
}
