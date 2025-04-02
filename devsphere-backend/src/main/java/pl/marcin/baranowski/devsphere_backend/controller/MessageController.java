package pl.marcin.baranowski.devsphere_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import pl.marcin.baranowski.devsphere_backend.service.MessageService;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;
}
