package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "about_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AboutSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String companyStory;
    @Column(columnDefinition = "TEXT")
    private String mission;
    @Column(columnDefinition = "TEXT")
    private String vision;
    
    // Core values stored as JSON string
    @Column(columnDefinition = "TEXT")
    private String coreValuesJson;

    private String heroImageUrl;
}
