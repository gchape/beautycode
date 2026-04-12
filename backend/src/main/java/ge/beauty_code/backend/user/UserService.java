package ge.beauty_code.backend.user;

import ge.beauty_code.backend.exception.UserAlreadyExistsException;
import ge.beauty_code.backend.exception.UserNotFoundException;
import ge.beauty_code.backend.user.dto.UserDto;
import ge.beauty_code.backend.user.model.UserItem;
import org.jspecify.annotations.NullMarked;
import org.springframework.stereotype.Service;

@Service
@NullMarked
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto findUserByEmail(String email) {
        return userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("მომხმარებელი Email-ით " + email + " ვერ მოიძებნა"));
    }

    public void registerUser(UserItem user) {
        if (!userRepository.save(user)) {
            throw new UserAlreadyExistsException("მომხმარებელი Email-ით " + user.email() + " უკვე არსებობს");
        }
    }
}
