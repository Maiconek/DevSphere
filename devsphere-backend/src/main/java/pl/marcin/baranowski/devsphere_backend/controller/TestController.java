package pl.marcin.baranowski.devsphere_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/secured")
    public String secured() {
        return "secured";
    }
}