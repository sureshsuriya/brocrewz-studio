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

    @Autowired private AnalyticsEventRepository analyticsRepo;

    @PostMapping("/analytics/track")
    public ResponseEntity<?> trackAnalytics(@RequestBody com.brocrewz.backend.dto.AnalyticsTrackRequest req, jakarta.servlet.http.HttpServletRequest httpRequest) {
        if (req == null || req.getPagePath() == null) {
            return ResponseEntity.badRequest().build();
        }

        String path = req.getPagePath().trim();
        String userAgent = httpRequest.getHeader("User-Agent");
        String ip = httpRequest.getRemoteAddr();

        // 1. Exclude Bots and Admin/API paths
        if (path.startsWith("/admin") || path.startsWith("/login") || path.startsWith("/forgot-password") || path.startsWith("/reset-password") || path.startsWith("/api")) {
            return ResponseEntity.ok(java.util.Map.of("tracked", false, "reason", "EXCLUDED_PATH"));
        }
        if (userAgent != null && userAgent.toLowerCase().matches(".*(bot|crawler|spider|googlebot|bingbot|slurp|duckduckbot|lighthouse).*")) {
            return ResponseEntity.ok(java.util.Map.of("tracked", false, "reason", "BOT_IGNORED"));
        }

        // 2. Hash unique visitor ID (Session ID + IP + User Agent)
        String clientSessionId = (req.getClientSessionId() != null && !req.getClientSessionId().isEmpty()) ? req.getClientSessionId() : "anon-session";
        String rawVisitorKey = clientSessionId + "|" + (ip != null ? ip : "") + "|" + (userAgent != null ? userAgent : "");
        String visitorId = Integer.toHexString(rawVisitorKey.hashCode());

        // 3. Deduplication Check: Check last event for this visitor
        java.util.Optional<com.brocrewz.backend.entity.AnalyticsEvent> lastOpt = analyticsRepo.findTopByVisitorIdOrderByTimestampDesc(visitorId);
        if (lastOpt.isPresent()) {
            com.brocrewz.backend.entity.AnalyticsEvent last = lastOpt.get();
            // If same page refresh within 10 mins, update timestamp (heartbeat) without creating duplicate page view
            if (path.equals(last.getPagePath()) && last.getTimestamp() != null && last.getTimestamp().isAfter(java.time.LocalDateTime.now().minusMinutes(10))) {
                last.setTimestamp(java.time.LocalDateTime.now());
                analyticsRepo.save(last);
                return ResponseEntity.ok(java.util.Map.of("tracked", false, "reason", "PAGE_REFRESH_IGNORED"));
            }
        }

        // 4. Save new Page View event
        com.brocrewz.backend.entity.AnalyticsEvent event = new com.brocrewz.backend.entity.AnalyticsEvent();
        event.setEventType("PAGE_VIEW");
        event.setPagePath(path);
        event.setVisitorId(visitorId);
        event.setClientSessionId(clientSessionId);
        event.setIpAddress(ip);
        event.setUserAgent(userAgent);
        event.setDeviceType(parseDevice(userAgent));
        event.setBrowser(parseBrowser(userAgent));
        event.setOs(parseOs(userAgent));
        event.setTimestamp(java.time.LocalDateTime.now());

        analyticsRepo.save(event);

        return ResponseEntity.ok(java.util.Map.of("tracked", true, "eventType", "PAGE_VIEW", "visitorId", visitorId));
    }

    private String parseDevice(String ua) {
        if (ua == null) return "Desktop";
        if (ua.contains("Mobile") || ua.contains("Android") || ua.contains("iPhone")) return "Mobile";
        if (ua.contains("Tablet") || ua.contains("iPad")) return "Tablet";
        return "Desktop";
    }

    private String parseBrowser(String ua) {
        if (ua == null) return "Chrome";
        if (ua.contains("Edg")) return "Edge";
        if (ua.contains("Chrome")) return "Chrome";
        if (ua.contains("Safari")) return "Safari";
        if (ua.contains("Firefox")) return "Firefox";
        return "Other";
    }

    private String parseOs(String ua) {
        if (ua == null) return "Windows";
        if (ua.contains("Windows")) return "Windows";
        if (ua.contains("Mac OS")) return "MacOS";
        if (ua.contains("Android")) return "Android";
        if (ua.contains("iPhone") || ua.contains("iOS")) return "iOS";
        if (ua.contains("Linux")) return "Linux";
        return "Other";
    }
}
