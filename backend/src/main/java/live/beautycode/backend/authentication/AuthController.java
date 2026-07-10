package live.beautycode.backend.authentication;

import live.beautycode.backend.authentication.dto.LoginRequest;
import live.beautycode.backend.authentication.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(path = "/api/login", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AuthController {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, String> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        String token = jwtService.generateToken(authentication);
        return Map.of("token", token);
    }
}
