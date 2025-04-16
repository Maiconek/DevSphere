package pl.marcin.baranowski.devsphere_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.dto.ChatMessageDto;
import pl.marcin.baranowski.devsphere_backend.model.ChatMessage;

@Service
@RequiredArgsConstructor
public class ChatMessageMapper {
    private final UserMapper userMapper;

    public ChatMessageDto toDto(ChatMessage chatMessage) {
        return new ChatMessageDto(
                userMapper.toUserDto(chatMessage.getSender()),
                chatMessage.getContent(),
                chatMessage.getType(),
                chatMessage.getTimestamp()
        );
    }
}
