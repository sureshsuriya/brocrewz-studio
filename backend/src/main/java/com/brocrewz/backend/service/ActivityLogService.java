package com.brocrewz.backend.service;

import com.brocrewz.backend.entity.ActivityLog;
import com.brocrewz.backend.repository.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActivityLogService {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    public void logActivity(String userEmail, String action, String entityType, String entityName) {
        ActivityLog log = ActivityLog.builder()
                .userEmail(userEmail)
                .action(action)
                .entityType(entityType)
                .entityName(entityName)
                .timestamp(LocalDateTime.now())
                .build();
        activityLogRepository.save(log);
    }
    
    public List<ActivityLog> getRecentActivities() {
        return activityLogRepository.findAllByOrderByTimestampDesc();
    }
}
