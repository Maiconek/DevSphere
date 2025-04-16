package pl.marcin.baranowski.devsphere_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;
import pl.marcin.baranowski.devsphere_backend.dto.ChatMessageDto;
import pl.marcin.baranowski.devsphere_backend.model.ChatMessage;
import pl.marcin.baranowski.devsphere_backend.service.ChatMessageService;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
public class ChatMessageController {
    private final ChatMessageService chatMessageService;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessageDto dto, Principal principal) {
        return chatMessageService.sendMessage(dto, principal.getName());
    }
}
