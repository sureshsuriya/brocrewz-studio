package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "home_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HomeSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String heroTitle;
    private String heroSubtitle;
    @Column(columnDefinition = "TEXT")
    private String heroDescription;
    private String heroBackgroundUrl;
    private String ctaPrimaryText;
    private String ctaPrimaryLink;
    private String ctaSecondaryText;
    private String ctaSecondaryLink;
    
    // Stats
    private String statsProjectsCompleted;
    private String statsHappyClients;
    private String statsYearsExperience;
}
