package com.brocrewz.backend.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitService {
    
    // IP Address -> Array of [Count, UnixTimestamp]
    private final Map<String, long[]> requestCounts = new ConcurrentHashMap<>();
    
    private static final int MAX_REQUESTS = 3;
    private static final long TIME_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

    public boolean isAllowed(String ipAddress) {
        long currentTime = System.currentTimeMillis();
        long[] data = requestCounts.getOrDefault(ipAddress, new long[]{0, currentTime});
        
        long count = data[0];
        long startTime = data[1];

        // Reset if window has passed
        if (currentTime - startTime > TIME_WINDOW_MS) {
            count = 0;
            startTime = currentTime;
        }

        if (count >= MAX_REQUESTS) {
            return false;
        }

        requestCounts.put(ipAddress, new long[]{count + 1, startTime});
        return true;
    }
}
