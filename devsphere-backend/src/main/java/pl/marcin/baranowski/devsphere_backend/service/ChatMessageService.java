package pl.marcin.baranowski.devsphere_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.model.ChatMessage;
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

    public ChatMessage sendMessage(Long senderId, Long receiverId, String content) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        User sender = userRepository.findByEmail(currentUsername)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        if(sender == null) {
            throw new RuntimeException();
        }
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        pl.marcin.baranowski.devsphere_backend.model.ChatMessage chatMessage = pl.marcin.baranowski.devsphere_backend.model.ChatMessage.builder()
                .sender(sender)
                .content(content)
                .timestamp(LocalDateTime.now())
                .build();

        return chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> getMessages(Long userId) {
        return chatMessageRepository.findBySenderIdOrReceiverId(userId, userId);
    }
}
