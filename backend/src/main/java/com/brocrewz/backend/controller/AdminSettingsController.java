package com.brocrewz.backend.controller;

import com.brocrewz.backend.entity.*;
import com.brocrewz.backend.repository.*;
import com.brocrewz.backend.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminSettingsController {

    @Autowired private SiteSettingsRepository siteRepo;
    @Autowired private ThemeSettingsRepository themeRepo;
    @Autowired private HomeSettingsRepository homeRepo;
    @Autowired private AboutSettingsRepository aboutRepo;
    @Autowired private FaqRepository faqRepo;
    @Autowired private FileStorageService fileService;
    @Autowired private AnalyticsEventRepository analyticsRepo;
    @Autowired private ContactMessageRepository contactRepo;
    @Autowired private ActivityLogRepository activityLogRepo;
    @Autowired private com.brocrewz.backend.service.ActivityLogService activityLogService;

    @GetMapping("/activities")
    public ResponseEntity<List<com.brocrewz.backend.entity.ActivityLog>> getActivities() {
        return ResponseEntity.ok(activityLogService.getRecentActivities());
    }

    @DeleteMapping("/activities")
    public ResponseEntity<?> clearActivities() {
        activityLogRepo.deleteAll();
        return ResponseEntity.ok().build();
    }
    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics() {
        Map<String, Object> stats = new HashMap<>();
        java.time.LocalDateTime now = java.time.LocalDateTime.now();

        long totalVisitors = analyticsRepo.countUniqueVisitors();
        long totalEvents = analyticsRepo.count();
        long activeSessions = analyticsRepo.countActiveSessions(now.minusMinutes(15));
        long contactRequests = contactRepo.count();

        stats.put("totalVisitors", totalVisitors);
        stats.put("totalEvents", totalEvents);
        stats.put("totalPageViews", totalEvents);
        stats.put("activeSessions", activeSessions);
        stats.put("contactRequests", contactRequests);

        // Page View Breakdown
        Map<String, Long> pageViews = new HashMap<>();
        pageViews.put("home", analyticsRepo.countByPagePath("/") + analyticsRepo.countByPagePath("/home"));
        pageViews.put("about", analyticsRepo.countByPagePath("/about"));
        pageViews.put("services", analyticsRepo.countByPagePath("/services"));
        pageViews.put("portfolio", analyticsRepo.countByPagePath("/portfolio"));
        pageViews.put("team", analyticsRepo.countByPagePath("/team"));
        pageViews.put("testimonials", analyticsRepo.countByPagePath("/testimonials"));
        pageViews.put("faq", analyticsRepo.countByPagePath("/faq"));
        pageViews.put("contact", analyticsRepo.countByPagePath("/contact"));
        stats.put("pageViews", pageViews);

        // Time Breakdown
        Map<String, Long> timeStats = new HashMap<>();
        timeStats.put("today", analyticsRepo.countUniqueVisitorsAfter(now.withHour(0).withMinute(0).withSecond(0)));
        timeStats.put("thisWeek", analyticsRepo.countUniqueVisitorsAfter(now.minusDays(7)));
        timeStats.put("thisMonth", analyticsRepo.countUniqueVisitorsAfter(now.minusDays(30)));
        stats.put("timeStats", timeStats);

        // Device & Browser Breakdown
        List<AnalyticsEvent> allEvents = analyticsRepo.findAll();
        Map<String, Long> deviceBreakdown = allEvents.stream()
                .collect(java.util.stream.Collectors.groupingBy(e -> e.getDeviceType() != null ? e.getDeviceType() : "Desktop", java.util.stream.Collectors.counting()));
        Map<String, Long> browserBreakdown = allEvents.stream()
                .collect(java.util.stream.Collectors.groupingBy(e -> e.getBrowser() != null ? e.getBrowser() : "Chrome", java.util.stream.Collectors.counting()));
        
        stats.put("deviceBreakdown", deviceBreakdown);
        stats.put("browserBreakdown", browserBreakdown);

        // Visitor traffic (Last 7 days)
        java.time.LocalDateTime cutoff = now.minusDays(6).withHour(0).withMinute(0).withSecond(0).withNano(0);
        List<AnalyticsEvent> events7Days = analyticsRepo.findByTimestampAfter(cutoff);
        java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("EEE");
        List<Map<String, Object>> traffic = new java.util.ArrayList<>();
        
        for (int i = 6; i >= 0; i--) {
            java.time.LocalDate date = java.time.LocalDate.now().minusDays(i);
            String dayName = date.format(formatter);
            long visitors = events7Days.stream()
                .filter(e -> e.getTimestamp() != null && e.getTimestamp().toLocalDate().equals(date))
                .map(e -> e.getVisitorId() != null ? e.getVisitorId() : e.getIpAddress())
                .filter(java.util.Objects::nonNull)
                .distinct()
                .count();

            Map<String, Object> dayData = new HashMap<>();
            dayData.put("name", dayName);
            dayData.put("visitors", visitors);
            traffic.add(dayData);
        }
        stats.put("visitorTraffic", traffic);

        return ResponseEntity.ok(stats);
    }

    @DeleteMapping("/analytics/reset")
    public ResponseEntity<?> resetAnalytics() {
        analyticsRepo.deleteAll();
        return ResponseEntity.ok().build();
    }

    // --- File Upload ---
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("folder") String folder) {
        String url = fileService.saveFile(file, folder);
        return ResponseEntity.ok(Map.of("url", url));
    }

    // --- Settings ---
    @PostMapping("/settings/site")
    public ResponseEntity<?> updateSiteSettings(@RequestBody SiteSettings settings) {
        if(settings.getId() == null) {
            List<SiteSettings> all = siteRepo.findAll();
            if(!all.isEmpty()) settings.setId(all.get(0).getId());
        }
        return ResponseEntity.ok(siteRepo.save(settings));
    }

    @PostMapping("/settings/theme")
    public ResponseEntity<?> updateThemeSettings(@RequestBody ThemeSettings settings) {
        if(settings.getId() == null) {
            List<ThemeSettings> all = themeRepo.findAll();
            if(!all.isEmpty()) settings.setId(all.get(0).getId());
        }
        return ResponseEntity.ok(themeRepo.save(settings));
    }

    @PostMapping("/settings/home")
    public ResponseEntity<?> updateHomeSettings(@RequestBody HomeSettings settings) {
        if(settings.getId() == null) {
            List<HomeSettings> all = homeRepo.findAll();
            if(!all.isEmpty()) settings.setId(all.get(0).getId());
        }
        return ResponseEntity.ok(homeRepo.save(settings));
    }

    @PostMapping("/settings/about")
    public ResponseEntity<?> updateAboutSettings(@RequestBody AboutSettings settings) {
        if(settings.getId() == null) {
            List<AboutSettings> all = aboutRepo.findAll();
            if(!all.isEmpty()) settings.setId(all.get(0).getId());
        }
        return ResponseEntity.ok(aboutRepo.save(settings));
    }

    // --- FAQs ---
    @GetMapping("/faqs")
    public ResponseEntity<List<Faq>> getAllFaqs() {
        return ResponseEntity.ok(faqRepo.findAll());
    }

    @PostMapping("/faqs")
    public ResponseEntity<Faq> createFaq(@RequestBody Faq faq) {
        return ResponseEntity.ok(faqRepo.save(faq));
    }

    @PutMapping("/faqs/{id}")
    public ResponseEntity<Faq> updateFaq(@PathVariable Long id, @RequestBody Faq details) {
        Faq faq = faqRepo.findById(id).orElseThrow();
        faq.setQuestion(details.getQuestion());
        faq.setAnswer(details.getAnswer());
        faq.setDisplayOrder(details.getDisplayOrder());
        return ResponseEntity.ok(faqRepo.save(faq));
    }

    @DeleteMapping("/faqs/{id}")
    public ResponseEntity<?> deleteFaq(@PathVariable Long id) {
        faqRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Services ---
    @Autowired private ServicePlanRepository serviceRepo;

    @PostMapping("/services")
    public ResponseEntity<ServicePlan> createService(@RequestBody ServicePlan service) {
        return ResponseEntity.ok(serviceRepo.save(service));
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<ServicePlan> updateService(@PathVariable Long id, @RequestBody ServicePlan details) {
        ServicePlan service = serviceRepo.findById(id).orElseThrow();
        service.setName(details.getName());
        service.setDescription(details.getDescription());
        service.setPrice(details.getPrice());
        service.setPlanType(details.getPlanType());
        service.setFeatures(details.getFeatures());
        return ResponseEntity.ok(serviceRepo.save(service));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        serviceRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Team ---
    @Autowired private TeamMemberRepository teamRepo;

    @PostMapping("/team")
    public ResponseEntity<TeamMember> createTeam(@RequestBody TeamMember member) {
        return ResponseEntity.ok(teamRepo.save(member));
    }

    @PutMapping("/team/{id}")
    public ResponseEntity<TeamMember> updateTeam(@PathVariable Long id, @RequestBody TeamMember details) {
        TeamMember member = teamRepo.findById(id).orElseThrow();
        member.setName(details.getName());
        member.setRole(details.getRole());
        member.setPhone(details.getPhone());
        member.setSkills(details.getSkills());
        member.setImageUrl(details.getImageUrl());
        member.setDescription(details.getDescription());
        member.setDisplayOrder(details.getDisplayOrder());
        member.setCategory(details.getCategory());
        return ResponseEntity.ok(teamRepo.save(member));
    }

    @DeleteMapping("/team/{id}")
    public ResponseEntity<?> deleteTeam(@PathVariable Long id) {
        teamRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Testimonials ---
    @Autowired private TestimonialRepository testimonialRepo;

    @PostMapping("/testimonials")
    public ResponseEntity<Testimonial> createTestimonial(@RequestBody Testimonial t) {
        return ResponseEntity.ok(testimonialRepo.save(t));
    }

    @PutMapping("/testimonials/{id}")
    public ResponseEntity<Testimonial> updateTestimonial(@PathVariable Long id, @RequestBody Testimonial details) {
        Testimonial t = testimonialRepo.findById(id).orElseThrow();
        t.setClientName(details.getClientName());
        t.setFeedback(details.getFeedback());
        t.setRating(details.getRating());
        return ResponseEntity.ok(testimonialRepo.save(t));
    }

    @DeleteMapping("/testimonials/{id}")
    public ResponseEntity<?> deleteTestimonial(@PathVariable Long id) {
        testimonialRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // --- Portfolio ---
    @Autowired private PortfolioItemRepository portfolioRepo;

    @PostMapping("/portfolio")
    public ResponseEntity<PortfolioItem> createPortfolioItem(@RequestBody PortfolioItem item) {
        return ResponseEntity.ok(portfolioRepo.save(item));
    }

    @PutMapping("/portfolio/{id}")
    public ResponseEntity<PortfolioItem> updatePortfolioItem(@PathVariable Long id, @RequestBody PortfolioItem details) {
        PortfolioItem item = portfolioRepo.findById(id).orElseThrow();
        item.setTitle(details.getTitle());
        item.setCategory(details.getCategory());
        item.setImageUrl(details.getImageUrl());
        item.setVideoUrl(details.getVideoUrl());
        item.setBeforeImageUrl(details.getBeforeImageUrl());
        item.setAfterImageUrl(details.getAfterImageUrl());
        item.setClientName(details.getClientName());
        item.setDescription(details.getDescription());
        item.setCompletionDate(details.getCompletionDate());
        item.setFeatured(details.isFeatured());
        item.setActive(details.isActive());
        item.setDisplayOrder(details.getDisplayOrder());
        return ResponseEntity.ok(portfolioRepo.save(item));
    }

    @DeleteMapping("/portfolio/{id}")
    public ResponseEntity<?> deletePortfolioItem(@PathVariable Long id) {
        portfolioRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/portfolio/reorder")
    public ResponseEntity<?> reorderPortfolio(@RequestBody List<PortfolioItem> orderedItems) {
        for (int i = 0; i < orderedItems.size(); i++) {
            PortfolioItem item = portfolioRepo.findById(orderedItems.get(i).getId()).orElse(null);
            if (item != null) {
                item.setDisplayOrder(i);
                portfolioRepo.save(item);
            }
        }
        return ResponseEntity.ok().build();
    }
}
