package live.beautycode.backend.user.controller;

import live.beautycode.backend.user.dto.UserProfile;
import live.beautycode.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(
        path = "/api/users",
        produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping(value = "/profile")
    public UserProfile getUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return userService.findUserByEmail(userDetails.getUsername());
    }
}
