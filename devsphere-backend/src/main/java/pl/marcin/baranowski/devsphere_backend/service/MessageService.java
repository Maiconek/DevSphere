package pl.marcin.baranowski.devsphere_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.marcin.baranowski.devsphere_backend.model.Message;
import pl.marcin.baranowski.devsphere_backend.model.User;
import pl.marcin.baranowski.devsphere_backend.repository.MessageRepository;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;

    public Message sendMessage(String content, User sender, User receiver) {
        Message message = Message.builder()
                .content(content)
                .sender(sender)
                .receiver(receiver)
                .build();
        return messageRepository.save(message);
    }
}
