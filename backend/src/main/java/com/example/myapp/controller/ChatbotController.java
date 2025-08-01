package com.example.myapp.controller;

import com.example.myapp.model.ChatbotRequest;
import com.example.myapp.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    private final ChatbotService chatbotService;

    @Autowired
    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/ask")
    public String askChatbot(@RequestBody ChatbotRequest request) {
        return chatbotService.processRequest(request);
    }
}