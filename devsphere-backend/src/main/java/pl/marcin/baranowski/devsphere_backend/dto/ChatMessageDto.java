package pl.marcin.baranowski.devsphere_backend.dto;

import pl.marcin.baranowski.devsphere_backend.model.MessageType;
import java.time.LocalDateTime;

public record ChatMessageDto (
        UserDto userDto,
        String content,
        MessageType type,
        LocalDateTime timestamp
) {

}
