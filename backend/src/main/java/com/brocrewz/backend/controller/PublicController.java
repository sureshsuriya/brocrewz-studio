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
}
