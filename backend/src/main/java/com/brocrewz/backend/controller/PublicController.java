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
        return ResponseEntity.ok(portfolioItemRepository.findAll());
    }

    @GetMapping("/testimonials")
    public ResponseEntity<?> getTestimonials() {
        return ResponseEntity.ok(testimonialRepository.findAll());
    }
}
