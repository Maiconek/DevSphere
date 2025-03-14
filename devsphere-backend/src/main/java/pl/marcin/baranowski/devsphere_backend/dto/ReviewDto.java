package pl.marcin.baranowski.devsphere_backend.dto;

import pl.marcin.baranowski.devsphere_backend.model.Project;

public record ReviewDto(
        String content,
        Integer score,
        UserDto userDto,
        Project project
) {
}
