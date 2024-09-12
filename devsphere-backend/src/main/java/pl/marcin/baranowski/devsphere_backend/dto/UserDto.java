package pl.marcin.baranowski.devsphere_backend.dto;

public record UserDto(
        String firstName,
        String lastName,
        String email,
        String bio,
        String company
) {
}
