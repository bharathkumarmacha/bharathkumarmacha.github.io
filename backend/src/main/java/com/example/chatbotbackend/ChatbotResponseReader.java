package com.example.chatbotbackend;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.StringTokenizer;

public class ChatbotResponseReader {

    private Map<String, String> responses;

    public ChatbotResponseReader(String filepath) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        responses = mapper.readValue(new File(filepath), Map.class);
    }

    public String getResponse(String question) {
        String response = responses.get(question.toLowerCase());
        if (response != null) {
            return response;
        } else {
            return generateDynamicResponse(question);
        }
    }

    private String generateDynamicResponse(String question) {
        // Implement your dynamic response generation logic here
        StringTokenizer tokenizer = new StringTokenizer(question);
        StringBuilder response = new StringBuilder("This is a dynamically generated response for: ");
        while (tokenizer.hasMoreTokens()) {
            response.append(tokenizer.nextToken()).append(" ");
        }
        return response.toString().trim();
    }
}
