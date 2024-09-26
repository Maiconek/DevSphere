package pl.marcin.baranowski.devsphere_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.marcin.baranowski.devsphere_backend.dto.UserDto;
import pl.marcin.baranowski.devsphere_backend.exceptions.ResourceNotFoundException;
import pl.marcin.baranowski.devsphere_backend.model.User;
import pl.marcin.baranowski.devsphere_backend.repository.UserRepository;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final ImageUploaderService imageUploaderService;

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toUserDto)
                .toList();
    }

    public UserDto getSingleUser(Long id) {
        return userRepository.findById(id)
                .stream()
                .map(userMapper::toUserDto)
                .findFirst().orElseThrow(() -> new ResourceNotFoundException("User does not exist with id: " + id));
    }

    public UserDto updateUser(Long id, User user, MultipartFile image) throws IOException {
        User updatedUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist with id: " + id));
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setBio(user.getBio());
        updatedUser.setCompany(user.getCompany());

        String imageUrl = imageUploaderService.uploadImage(image);
        updatedUser.setImageUrl(imageUrl);

        userRepository.save(updatedUser);

        return userMapper.toUserDto(updatedUser);
    }

//    public User findByUsername(String username) {
//        return userRepository.findByUsername(username);
//    }
}
