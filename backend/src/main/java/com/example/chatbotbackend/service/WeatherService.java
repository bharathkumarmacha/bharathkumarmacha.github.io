package com.example.chatbotbackend.service;

import com.example.chatbotbackend.pojo.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${weather.api.url}")
    private String weatherApiUrl;

    @Value("${weather.api.key}")
    private String weatherApiKey;

    public WeatherResponse getWeather(String city) {
        String url = String.format("%s?q=%s&appid=%s", weatherApiUrl, city, weatherApiKey);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, WeatherResponse.class);
    }
}
