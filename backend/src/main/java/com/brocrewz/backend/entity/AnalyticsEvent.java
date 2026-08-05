package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "analytics_events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventType; // "PAGE_VIEW", "PORTFOLIO_VIEW", "CONTACT_SUBMISSION"
    private String pagePath;
    private String ipAddress;
    private String userAgent;
    private String deviceType;
    private String browser;
    private String os;
    
    @Column(updatable = false)
    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
    }
}
