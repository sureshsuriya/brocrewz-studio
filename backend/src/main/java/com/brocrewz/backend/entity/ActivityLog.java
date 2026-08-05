package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activity_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail; // The user who performed the action
    
    @Column(nullable = false)
    private String action; // e.g., "CREATED", "UPDATED", "DELETED"
    
    @Column(nullable = false)
    private String entityType; // e.g., "PORTFOLIO", "SERVICE"
    
    private String entityName; // e.g., "Logo Design"

    @Column(nullable = false)
    private LocalDateTime timestamp;
}
