package pl.marcin.baranowski.devsphere_backend.dto;

public record ReviewDto(
        Long projectId,
        String content,
        Integer score
) {
}
