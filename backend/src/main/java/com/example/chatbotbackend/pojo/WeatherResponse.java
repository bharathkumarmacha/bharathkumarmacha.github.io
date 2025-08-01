package com.example.chatbotbackend.pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherResponse {
    private String name;
    private Main main;
    private Weather[] weather;

    // Getters and setters

    public static class Main {
        private double temp;

        // Getters and setters
    }

    public static class Weather {
        private String description;

        // Getters and setters
    }
}
