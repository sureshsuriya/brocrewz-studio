package com.brocrewz.backend.repository;

import com.brocrewz.backend.entity.AnalyticsEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AnalyticsEventRepository extends JpaRepository<AnalyticsEvent, Long> {

    @Query("SELECT COUNT(DISTINCT COALESCE(a.visitorId, a.ipAddress)) FROM AnalyticsEvent a WHERE a.eventType = 'PAGE_VIEW'")
    long countUniqueVisitors();

    @Query("SELECT COUNT(DISTINCT COALESCE(a.visitorId, a.ipAddress)) FROM AnalyticsEvent a WHERE a.eventType = 'PAGE_VIEW' AND a.timestamp >= :cutoff")
    long countActiveSessions(@Param("cutoff") LocalDateTime cutoff);

    @Query("SELECT COUNT(DISTINCT COALESCE(a.visitorId, a.ipAddress)) FROM AnalyticsEvent a WHERE a.eventType = 'PAGE_VIEW' AND a.timestamp >= :cutoff")
    long countUniqueVisitorsAfter(@Param("cutoff") LocalDateTime cutoff);

    @Query("SELECT COUNT(a) FROM AnalyticsEvent a WHERE a.eventType = 'PAGE_VIEW' AND a.pagePath = :pagePath")
    long countByPagePath(@Param("pagePath") String pagePath);

    Optional<AnalyticsEvent> findTopByVisitorIdOrderByTimestampDesc(String visitorId);

    List<AnalyticsEvent> findByTimestampAfter(LocalDateTime cutoff);

    @Modifying
    @Query("DELETE FROM AnalyticsEvent a")
    void deleteAllAnalyticsEvents();
}
