package ge.beauty_code.backend.user;

import ge.beauty_code.backend.exception.UserAlreadyExistsException;
import ge.beauty_code.backend.exception.UserNotFoundException;
import ge.beauty_code.backend.user.dto.UserDto;
import ge.beauty_code.backend.user.model.UserItem;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto findUserByEmail(@NonNull String email) {
        return userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("მომხმარებელი Email-ით " + email + " ვერ მოიძებნა"));
    }

    public void registerUser(@NonNull UserItem user) {
        if (!userRepository.save(user)) {
            throw new UserAlreadyExistsException("მომხმარებელი Email-ით " + user.email() + " უკვე არსებობს");
        }
    }
}
