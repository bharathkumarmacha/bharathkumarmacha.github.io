package com.example.chatbotbackend;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.io.IOException;

public class ChatbotResponseReaderTest {

    @Test
    public void testGetResponse() throws IOException {
        ChatbotResponseReader reader = new ChatbotResponseReader("/d:/Workspace/Infomerica/chatbot/my-workspace/backend/src/main/resources/responses.json");

        assertEquals("Hi there!", reader.getResponse("Hello"));
        assertEquals("I'm a bot, I don't have feelings, but thanks for asking!", reader.getResponse("How are you?"));
        assertEquals("I am GitHub Copilot.", reader.getResponse("What is your name?"));
        assertEquals("I don't understand that question.", reader.getResponse("Unknown question"));
        assertEquals("This is a dynamically generated response for: What is the weather today?", reader.getResponse("What is the weather today?"));
    }
}
