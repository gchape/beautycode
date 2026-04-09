package ge.beauty_code.backend.service;

import ge.beauty_code.backend.dao.UserDao;
import ge.beauty_code.backend.dto.UserDto;
import ge.beauty_code.backend.exception.UserAlreadyExistsException;
import ge.beauty_code.backend.exception.UserNotFoundException;
import ge.beauty_code.backend.model.items.UserItem;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserDao userDao;

    @Autowired
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public UserDto findUserByEmail(@NonNull String email) {
        return userDao.findUserByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("მომხმარებელი Email-ით " + email + " ვერ მოიძებნა"));
    }

    public void registerUser(@NonNull UserItem user) {
        if (!userDao.save(user)) {
            throw new UserAlreadyExistsException("მომხმარებელი Email-ით " + user.email() + " უკვე არსებობს");
        }
    }
}
