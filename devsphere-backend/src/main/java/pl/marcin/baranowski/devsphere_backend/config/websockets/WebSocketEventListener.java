package pl.marcin.baranowski.devsphere_backend.config.websockets;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import pl.marcin.baranowski.devsphere_backend.model.ChatMessage;
import pl.marcin.baranowski.devsphere_backend.model.MessageType;
import pl.marcin.baranowski.devsphere_backend.model.User;
import pl.marcin.baranowski.devsphere_backend.repository.UserRepository;

import java.time.LocalDateTime;

//@Component
//@RequiredArgsConstructor
//@Slf4j
//public class WebSocketEventListener {
//    private final SimpMessageSendingOperations messageTemplate;
//    private final UserRepository userRepository;
//
//    @EventListener
//    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
//        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//        User user = (User) headerAccessor.getSessionAttributes().get("sender");
//
//        var foundUser = userRepository.findById(user.getId());
//        if(foundUser.isPresent()) {
//            log.info("User disconnected: {}", foundUser.get().getEmail());
//            var chatMessage = ChatMessage.builder()
//                    .type(MessageType.LEAVE)
//                    .sender(foundUser.get())
//                    .timestamp(LocalDateTime.now())
//                    .build();
////            var chatMessage = new ChatMessage("", username, MessageType.LEAVER);
//            messageTemplate.convertAndSend("/topic/public", chatMessage);
//        }
//    }
//}
