package com.brocrewz.backend.service;

import com.brocrewz.backend.entity.ContactMessage;
import com.brocrewz.backend.entity.SiteSettings;
import com.brocrewz.backend.repository.SiteSettingsRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SiteSettingsRepository siteSettingsRepository;

    public void sendContactNotification(ContactMessage message) {
        try {
            SiteSettings settings = siteSettingsRepository.findById(1L).orElse(new SiteSettings());
            String toEmail = settings.getContactFormEmailTo();
            
            if (toEmail == null || toEmail.trim().isEmpty()) {
                toEmail = "sureshsurey4@gmail.com"; // Fallback as requested
            }

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setTo(toEmail);
            helper.setSubject("New Lead from BroCrewz Studio: " + message.getSubject());
            
            String htmlContent = "<h2>New Contact Message</h2>"
                    + "<p><strong>Name:</strong> " + message.getName() + "</p>"
                    + "<p><strong>Email:</strong> " + message.getEmail() + "</p>"
                    + "<p><strong>Subject:</strong> " + message.getSubject() + "</p>"
                    + "<p><strong>Time:</strong> " + message.getCreatedAt().toString() + "</p>"
                    + "<hr/>"
                    + "<p><strong>Message:</strong></p>"
                    + "<p>" + message.getMessage().replace("\n", "<br/>") + "</p>";

            helper.setText(htmlContent, true);
            
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            System.err.println("Failed to send email notification: " + e.getMessage());
            // Do not throw, we still want to save the contact message to the DB
        }
    }

    public void sendPasswordResetEmail(String toEmail, String token) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setTo(toEmail);
            helper.setSubject("Password Reset Request - BroCrewz Studio");
            
            // Assuming frontend runs on same domain, relative path or hardcoded for now, ideally from settings/env
            String resetLink = "http://localhost:5173/reset-password?token=" + token; // For local/production, this would use a frontend URL env variable. Using relative or placeholder logic. We can just pass the frontend URL in env or hardcode for now. Let's just pass the reset link.
            
            String htmlContent = "<h2>Password Reset Request</h2>"
                    + "<p>You requested a password reset for your BroCrewz Studio admin account.</p>"
                    + "<p>Click the link below to reset your password. This link will expire in 15 minutes.</p>"
                    + "<p><a href=\"" + resetLink + "\">" + resetLink + "</a></p>"
                    + "<p>If you did not request this, please ignore this email.</p>";

            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            System.err.println("Failed to send password reset email: " + e.getMessage());
        }
    }
}
