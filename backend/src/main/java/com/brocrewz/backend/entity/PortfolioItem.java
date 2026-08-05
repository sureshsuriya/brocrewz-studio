package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "portfolio_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PortfolioItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String category;
    private String imageUrl;
    private String videoUrl;
    private String beforeImageUrl;
    private String afterImageUrl;

    private String clientName;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String completionDate;
    
    @Builder.Default
    private boolean isFeatured = false;
    
    @Builder.Default
    private boolean isActive = true;
    
    @Builder.Default
    private Integer displayOrder = 0;
}
