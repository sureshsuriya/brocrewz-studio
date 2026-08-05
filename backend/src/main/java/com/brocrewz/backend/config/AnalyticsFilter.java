package com.brocrewz.backend.config;

import com.brocrewz.backend.entity.AnalyticsEvent;
import com.brocrewz.backend.repository.AnalyticsEventRepository;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 1)
public class AnalyticsFilter implements Filter {

    @Autowired
    private AnalyticsEventRepository analyticsRepository;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (request instanceof HttpServletRequest httpRequest) {
            String path = httpRequest.getRequestURI();
            
            // Only track API calls or specific routes if needed. 
            // In a decoupled frontend/backend, the frontend will call /api/public/analytics to register page views.
            // Or we track all public API calls.
            if (path.startsWith("/api/public/")) {
                String ip = httpRequest.getRemoteAddr();
                String userAgent = httpRequest.getHeader("User-Agent");
                
                AnalyticsEvent event = AnalyticsEvent.builder()
                        .eventType("API_CALL")
                        .pagePath(path)
                        .ipAddress(ip)
                        .userAgent(userAgent)
                        .deviceType(parseDevice(userAgent))
                        .browser(parseBrowser(userAgent))
                        .os(parseOs(userAgent))
                        .build();
                        
                analyticsRepository.save(event);
            }
        }
        chain.doFilter(request, response);
    }
    
    private String parseDevice(String ua) {
        if (ua == null) return "Unknown";
        if (ua.contains("Mobile")) return "Mobile";
        if (ua.contains("Tablet") || ua.contains("iPad")) return "Tablet";
        return "Desktop";
    }

    private String parseBrowser(String ua) {
        if (ua == null) return "Unknown";
        if (ua.contains("Chrome")) return "Chrome";
        if (ua.contains("Safari")) return "Safari";
        if (ua.contains("Firefox")) return "Firefox";
        if (ua.contains("Edge")) return "Edge";
        return "Other";
    }

    private String parseOs(String ua) {
        if (ua == null) return "Unknown";
        if (ua.contains("Windows")) return "Windows";
        if (ua.contains("Mac OS X")) return "MacOS";
        if (ua.contains("Linux")) return "Linux";
        if (ua.contains("Android")) return "Android";
        if (ua.contains("iOS") || ua.contains("iPhone")) return "iOS";
        return "Other";
    }
}
