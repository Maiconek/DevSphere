package pl.marcin.baranowski.devsphere_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.marcin.baranowski.devsphere_backend.dto.MessageRequestDto;
import pl.marcin.baranowski.devsphere_backend.service.ChatMessageService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatMessageController {
    private final ChatMessageService chatMessageService;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public pl.marcin.baranowski.devsphere_backend.model.ChatMessage sendMessage(MessageRequestDto request) {
        pl.marcin.baranowski.devsphere_backend.model.ChatMessage chatMessage = this.chatMessageService.sendMessage(request.senderId(), request.recipientId(), request.content());
        return chatMessage;
    }

    @GetMapping("/{userId}")
    public List<pl.marcin.baranowski.devsphere_backend.model.ChatMessage> getMessages(@PathVariable Long userId) {
        return chatMessageService.getMessages(userId);
    }
}
