package pl.marcin.baranowski.devsphere_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.dto.ChatMessageDto;
import pl.marcin.baranowski.devsphere_backend.dto.ChatMessageRequestDto;
import pl.marcin.baranowski.devsphere_backend.model.ChatMessage;
import pl.marcin.baranowski.devsphere_backend.model.User;
import pl.marcin.baranowski.devsphere_backend.repository.ChatMessageRepository;
import pl.marcin.baranowski.devsphere_backend.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final ChatMessageMapper chatMessageMapper;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public ChatMessageDto sendMessage(ChatMessageRequestDto dto, String username) {
        System.out.println("Dostałem się");
        User sender = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        ChatMessage message = ChatMessage.builder()
                .sender(sender)
                .content(dto.content())
                .type(dto.type())
                .timestamp(LocalDateTime.now())
                .build();
        chatMessageRepository.save(message);
        return chatMessageMapper.toDto(message);
    }

    public List<ChatMessageDto> getAllMessages() {
        return chatMessageRepository
                .findAll()
                .stream()
                .map(chatMessageMapper::toDto)
                .sorted(Comparator.comparing(ChatMessageDto::timestamp))
                .toList();
    }

}
