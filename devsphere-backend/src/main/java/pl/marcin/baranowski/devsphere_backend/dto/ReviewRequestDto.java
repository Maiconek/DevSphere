package pl.marcin.baranowski.devsphere_backend.dto;

public record ReviewRequestDto(
        Long projectId,
        String content,
        Integer score
) {
}
