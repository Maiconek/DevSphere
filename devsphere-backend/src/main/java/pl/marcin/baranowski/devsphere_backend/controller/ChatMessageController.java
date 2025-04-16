package pl.marcin.baranowski.devsphere_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.marcin.baranowski.devsphere_backend.dto.ChatMessageDto;
import pl.marcin.baranowski.devsphere_backend.dto.ChatMessageRequestDto;
import pl.marcin.baranowski.devsphere_backend.model.ChatMessage;
import pl.marcin.baranowski.devsphere_backend.service.ChatMessageService;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatMessageController {
    private final ChatMessageService chatMessageService;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessageDto sendMessage(@Payload ChatMessageRequestDto dto, Principal principal) {
        return chatMessageService.sendMessage(dto, principal.getName());
    }


    @GetMapping("/msg")
    public List<ChatMessageDto> getAllChatMessages() {
        return chatMessageService.getAllMessages();
    }
}
