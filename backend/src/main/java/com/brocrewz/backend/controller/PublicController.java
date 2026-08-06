package com.brocrewz.backend.controller;

import com.brocrewz.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
public class PublicController {
    
    @Autowired private ServicePlanRepository servicePlanRepository;
    @Autowired private TeamMemberRepository teamMemberRepository;
    @Autowired private PortfolioItemRepository portfolioItemRepository;
    @Autowired private TestimonialRepository testimonialRepository;
    @Autowired private ContactMessageRepository contactMessageRepository;

    @Autowired private SiteSettingsRepository siteRepo;
    @Autowired private ThemeSettingsRepository themeRepo;
    @Autowired private HomeSettingsRepository homeRepo;
    @Autowired private AboutSettingsRepository aboutRepo;
    @Autowired private FaqRepository faqRepo;

    @GetMapping("/services")
    public ResponseEntity<?> getServices() {
        return ResponseEntity.ok(servicePlanRepository.findAll());
    }

    @GetMapping("/team")
    public ResponseEntity<?> getTeam() {
        return ResponseEntity.ok(teamMemberRepository.findAll());
    }

    @GetMapping("/portfolio")
    public ResponseEntity<?> getPortfolio() {
        return ResponseEntity.ok(portfolioItemRepository.findAll(org.springframework.data.domain.Sort.by("displayOrder")));
    }

    @GetMapping("/testimonials")
    public ResponseEntity<?> getTestimonials() {
        return ResponseEntity.ok(testimonialRepository.findAll());
    }

    @GetMapping("/faqs")
    public ResponseEntity<?> getFaqs() {
        return ResponseEntity.ok(faqRepo.findAll());
    }

    @GetMapping("/settings/site")
    public ResponseEntity<?> getSiteSettings() {
        return ResponseEntity.ok(siteRepo.findAll().stream().findFirst().orElse(null));
    }

    @GetMapping("/settings/theme")
    public ResponseEntity<?> getThemeSettings() {
        return ResponseEntity.ok(themeRepo.findAll().stream().findFirst().orElse(null));
    }

    @GetMapping("/settings/home")
    public ResponseEntity<?> getHomeSettings() {
        return ResponseEntity.ok(homeRepo.findAll().stream().findFirst().orElse(null));
    }

    @GetMapping("/settings/about")
    public ResponseEntity<?> getAboutSettings() {
        return ResponseEntity.ok(aboutRepo.findAll().stream().findFirst().orElse(null));
    }

    @Autowired private javax.sql.DataSource dataSource;
    @Autowired private org.springframework.core.env.Environment env;

    @GetMapping("/health")
    public ResponseEntity<?> getHealthInfo() {
        java.util.Map<String, Object> status = new java.util.HashMap<>();
        try (java.sql.Connection conn = dataSource.getConnection()) {
            java.sql.DatabaseMetaData meta = conn.getMetaData();
            status.put("databaseProduct", meta.getDatabaseProductName());
            status.put("databaseVersion", meta.getDatabaseProductVersion());
            status.put("driverName", meta.getDriverName());
            status.put("driverVersion", meta.getDriverVersion());
            
            String rawUrl = meta.getURL();
            String maskedUrl = rawUrl != null ? rawUrl.replaceAll("password=[^&]*", "password=***") : "N/A";
            status.put("datasourceUrl", maskedUrl);
            status.put("activeProfiles", env.getActiveProfiles());
            status.put("status", "UP");
            status.put("isPersistentDatabase", !meta.getDatabaseProductName().toLowerCase().contains("h2"));
        } catch (Exception e) {
            status.put("status", "ERROR");
            status.put("error", e.getMessage());
        }
        return ResponseEntity.ok(status);
    }
}
