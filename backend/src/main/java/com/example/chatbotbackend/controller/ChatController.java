package com.example.chatbotbackend.controller;

import com.example.chatbotbackend.pojo.Request;
import com.example.chatbotbackend.pojo.Response;
import com.example.chatbotbackend.pojo.WeatherResponse;
import com.example.chatbotbackend.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private WeatherService weatherService;

    @PostMapping
    public Response chat(@RequestBody Request request) {
        // Simple echo response for demonstration
        return new Response("You said: " + request.getMessage());
    }

    @GetMapping("/weather")
    public WeatherResponse getWeather(@RequestParam String city) {
        return weatherService.getWeather(city);
    }
}
