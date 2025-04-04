package pl.marcin.baranowski.devsphere_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.marcin.baranowski.devsphere_backend.dto.UserDto;
import pl.marcin.baranowski.devsphere_backend.model.User;
import pl.marcin.baranowski.devsphere_backend.service.UserService;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1")
public class UserController {
    private final UserService userService;

    @GetMapping("/users")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public UserDto getSingleUser(@PathVariable Long id) {
        return userService.getSingleUser(id);
    }


    @PutMapping("/users/{id}")
    public UserDto updateProject(@PathVariable Long id, @RequestPart User user, @RequestPart MultipartFile image) throws IOException {
        return userService.updateUser(id, user, image);
    }

    @GetMapping("/users/email/{email}")
    public UserDto getUserByEmail(@PathVariable String email) {
        return userService.findUserByEmail(email);
    }

}
