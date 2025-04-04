package pl.marcin.baranowski.devsphere_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.marcin.baranowski.devsphere_backend.dto.MessageRequestDto;
import pl.marcin.baranowski.devsphere_backend.model.Message;
import pl.marcin.baranowski.devsphere_backend.service.MessageService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message sendMessage(MessageRequestDto request) {
        Message message = messageService.sendMessage(request.senderId(), request.recipientId(), request.content());
        return message;
    }

    @GetMapping("/{userId}")
    public List<Message> getMessages(@PathVariable Long userId) {
        return messageService.getMessages(userId);
    }
}
