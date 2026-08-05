package com.brocrewz.backend.repository;

import com.brocrewz.backend.entity.AnalyticsEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface AnalyticsEventRepository extends JpaRepository<AnalyticsEvent, Long> {
    @Query("SELECT COUNT(DISTINCT a.ipAddress) FROM AnalyticsEvent a")
    long countUniqueVisitors();

    @Query("SELECT COUNT(DISTINCT a.ipAddress) FROM AnalyticsEvent a WHERE a.timestamp >= :cutoff")
    long countActiveSessions(@Param("cutoff") LocalDateTime cutoff);

    List<AnalyticsEvent> findByTimestampAfter(LocalDateTime cutoff);
}
