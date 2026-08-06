package com.brocrewz.backend.config;

import jakarta.servlet.*;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 1)
public class AnalyticsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // Public traffic is ingested exclusively through POST /api/public/analytics/track
        // to prevent API calls, admin requests, and background polling from polluting analytics counters.
        chain.doFilter(request, response);
    }
}
