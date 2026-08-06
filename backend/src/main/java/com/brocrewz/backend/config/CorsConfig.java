package com.brocrewz.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class CorsConfig {

    @Value("${cors.allowed-origins:${CORS_ALLOWED_ORIGINS:}}")
    private String allowedOriginsEnv;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        if (allowedOriginsEnv != null && !allowedOriginsEnv.trim().isEmpty()) {
            List<String> origins = Arrays.stream(allowedOriginsEnv.split(","))
                    .map(String::trim)
                    .map(origin -> origin.replaceAll("/+$", ""))
                    .filter(origin -> !origin.isEmpty())
                    .collect(Collectors.toList());
            for (String origin : origins) {
                config.addAllowedOriginPattern(origin);
            }
        }

        // Always allow Vercel previews, production domains, and local development patterns
        config.addAllowedOriginPattern("https://*.vercel.app");
        config.addAllowedOriginPattern("https://brocrewz-studio-*.vercel.app");
        config.addAllowedOriginPattern("http://localhost:*");
        config.addAllowedOriginPattern("http://127.0.0.1:*");
        config.addAllowedOriginPattern("*"); // Universal pattern fallback for dynamic cloud hosts with credentials

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization", "Content-Disposition", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public CorsFilter corsFilter() {
        return new CorsFilter(corsConfigurationSource());
    }
}
