package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "site_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SiteSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String logoUrl;
    private String faviconUrl;
    private String email;
    private String phone;
    private String address;
    private String businessHours;
    private String copyrightText;
    private String instagramUrl;
    private String instagramUsername;
    private String contactFormEmailTo;
}
