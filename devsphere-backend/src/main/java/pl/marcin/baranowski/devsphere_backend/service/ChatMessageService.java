package pl.marcin.baranowski.devsphere_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.dto.ChatMessageDto;
import pl.marcin.baranowski.devsphere_backend.model.ChatMessage;
import pl.marcin.baranowski.devsphere_backend.model.MessageType;
import pl.marcin.baranowski.devsphere_backend.model.User;
import pl.marcin.baranowski.devsphere_backend.repository.ChatMessageRepository;
import pl.marcin.baranowski.devsphere_backend.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    public ChatMessage sendMessage(ChatMessageDto dto, String username) {
        User sender = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        ChatMessage message = ChatMessage.builder()
                .sender(sender)
                .content(dto.content())
                .type(dto.type())
                .timestamp(LocalDateTime.now())
                .build();

        return chatMessageRepository.save(message);
    }

//    public List<ChatMessage> getMessages(Long userId) {
//        return chatMessageRepository.findBySenderIdOrReceiverId(userId, userId);
//    }
}
