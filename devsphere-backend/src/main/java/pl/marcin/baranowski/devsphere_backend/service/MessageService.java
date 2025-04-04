package pl.marcin.baranowski.devsphere_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.model.Message;
import pl.marcin.baranowski.devsphere_backend.model.User;
import pl.marcin.baranowski.devsphere_backend.repository.MessageRepository;
import pl.marcin.baranowski.devsphere_backend.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public Message sendMessage(Long senderId, Long receiverId, String content) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        User sender = userRepository.findByEmail(currentUsername)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        if(sender == null) {
            throw new RuntimeException();
        }
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Message message = Message.builder()
                .sender(sender)
                .receiver(receiver)
                .content(content)
                .timestamp(LocalDateTime.now())
                .build();

        return messageRepository.save(message);
    }

    public List<Message> getMessages(Long userId) {
        return messageRepository.findBySenderIdOrReceiverId(userId, userId);
    }
}
