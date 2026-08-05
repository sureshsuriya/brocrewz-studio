package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "theme_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThemeSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String primaryColor;
    private String secondaryColor;
    private String accentColor;
    private String backgroundColor;
    private String fontFamily;
    private String borderRadius;
    private String glassBlur;
    private String animationSpeed;
}
