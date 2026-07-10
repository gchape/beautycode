package live.beautycode.backend.user.service;

import live.beautycode.backend.exception.UserAlreadyExistsException;
import live.beautycode.backend.exception.UserNotFoundException;
import live.beautycode.backend.user.User;
import live.beautycode.backend.user.dto.RegisterRequest;
import live.beautycode.backend.user.dto.UserProfile;
import live.beautycode.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new UserAlreadyExistsException("ელ-ფოსტა უკვე გამოყენებულია");
        }

        User user = new User();
        user.setUid(request.email());
        user.setFullName(request.firstName() + " " + request.lastName());
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setEmail(request.email());
        user.setPhone(request.phone());
        user.setPassword(passwordEncoder.encode(request.password()));

        userRepository.save(user);
    }

    public UserProfile findUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("მომხმარებელი ვერ მოიძებნა"));

        return new UserProfile(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhone());
    }
}
