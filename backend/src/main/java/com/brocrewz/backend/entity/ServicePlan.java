package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "service_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServicePlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String planType; // SINGLE, MONTHLY
    @Column(columnDefinition = "TEXT")
    private String features; // JSON array of strings or comma-separated
}
