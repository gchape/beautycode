package live.beautycode.backend.user.service;

import live.beautycode.backend.exception.UserAlreadyExistsException;
import live.beautycode.backend.exception.UserNotFoundException;
import live.beautycode.backend.user.User;
import live.beautycode.backend.user.dto.RegisterRequest;
import live.beautycode.backend.user.dto.UserProfile;
import live.beautycode.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new UserAlreadyExistsException("Email already in use");
        }

        User user = new User();
        user.setUid(request.email());
        user.setFullName(request.firstName() + " " + request.lastName());
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setEmail(request.email());
        user.setPhone(request.phone());
        user.setPassword(request.password());

        userRepository.save(user);
        log.info("User registered: {}", request.email());
    }

    public UserProfile findUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return new UserProfile(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhone());
    }
}
