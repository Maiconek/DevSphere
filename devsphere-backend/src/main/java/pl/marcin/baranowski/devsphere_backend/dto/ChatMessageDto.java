package pl.marcin.baranowski.devsphere_backend.dto;

import pl.marcin.baranowski.devsphere_backend.model.MessageType;

public record ChatMessageDto(
        String content,
        MessageType type
) {
}
