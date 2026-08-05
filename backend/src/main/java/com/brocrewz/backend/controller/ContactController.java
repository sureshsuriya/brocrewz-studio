package com.brocrewz.backend.controller;

import com.brocrewz.backend.entity.ContactMessage;
import com.brocrewz.backend.repository.ContactMessageRepository;
import com.brocrewz.backend.service.EmailService;
import com.brocrewz.backend.service.RateLimitService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private RateLimitService rateLimitService;

    // Public Endpoint
    @PostMapping("/public/contact")
    public ResponseEntity<?> submitContactMessage(@RequestBody ContactMessage message, HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        
        if (!rateLimitService.isAllowed(ipAddress)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Too many requests. Please try again later.");
        }

        // Basic validation
        if (message.getEmail() == null || message.getMessage() == null) {
            return ResponseEntity.badRequest().body("Email and message are required.");
        }

        message.setCreatedAt(LocalDateTime.now());
        message.setRead(false);
        message.setReplied(false);
        
        ContactMessage savedMessage = contactMessageRepository.save(message);

        // Send Email Notification Async (so it doesn't block response)
        new Thread(() -> emailService.sendContactNotification(savedMessage)).start();

        return ResponseEntity.ok(savedMessage);
    }

    // Admin Endpoints (CRM)
    @GetMapping("/admin/contacts")
    public ResponseEntity<List<ContactMessage>> getAllContacts() {
        return ResponseEntity.ok(contactMessageRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")));
    }

    @PutMapping("/admin/contacts/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        return contactMessageRepository.findById(id).map(msg -> {
            msg.setRead(true);
            contactMessageRepository.save(msg);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/admin/contacts/{id}/reply")
    public ResponseEntity<?> updateReplyStatus(@PathVariable Long id, @RequestBody ContactMessage updateData) {
        return contactMessageRepository.findById(id).map(msg -> {
            msg.setReplied(updateData.isReplied());
            msg.setReplyNotes(updateData.getReplyNotes());
            contactMessageRepository.save(msg);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/contacts/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long id) {
        if(contactMessageRepository.existsById(id)) {
            contactMessageRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
