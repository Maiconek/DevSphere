package pl.marcin.baranowski.devsphere_backend.dto;

public record MessageRequestDto(
        Long senderId,
        Long recipientId,
        String content
) {
}
