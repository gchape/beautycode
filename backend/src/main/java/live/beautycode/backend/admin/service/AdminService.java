package live.beautycode.backend.admin.service;

import live.beautycode.backend.admin.Admin;
import live.beautycode.backend.admin.repository.AdminRepository;
import live.beautycode.backend.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;

    public Admin findByEmail(String email) {
        return adminRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("ადმინი ვერ მოიძებნა"));
    }
}
