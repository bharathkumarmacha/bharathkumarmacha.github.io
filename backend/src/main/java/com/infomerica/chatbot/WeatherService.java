package com.infomerica.chatbot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class WeatherService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String getWeather(String location) {
        String apiKey = "YOUR_API_KEY";
        String apiUrl = String.format("https://api.weatherapi.com/v1/current.json?key=%s&q=%s", apiKey, location);

        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            saveWeatherData(location, response.body());
            return response.body();
        } catch (Exception e) {
            return "{\"error\": \"Sorry, I could not fetch the weather information.\"}";
        }
    }

    private void saveWeatherData(String location, String weatherData) {
        String sql = "INSERT INTO weather_data (location, data) VALUES (?, ?)";
        jdbcTemplate.update(sql, location, weatherData);
    }
}
