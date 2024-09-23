package pl.marcin.baranowski.devsphere_backend.dto;

public record UserDto(
        Long id,
        String firstName,
        String lastName,
        String email,
        String bio,
        String company,
        String imageUrl
) {
}
