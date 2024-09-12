package pl.marcin.baranowski.devsphere_backend.service;

import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.dto.UserDto;
import pl.marcin.baranowski.devsphere_backend.model.User;

@Service
public class UserMapper {
    public UserDto toUserDto(User user) {
        return new UserDto(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getBio(),
                user.getCompany()
        );
    }
}
