package com.brocrewz.backend.controller;

import com.brocrewz.backend.dto.*;
import com.brocrewz.backend.entity.PasswordResetToken;
import com.brocrewz.backend.entity.User;
import com.brocrewz.backend.repository.PasswordResetTokenRepository;
import com.brocrewz.backend.repository.UserRepository;
import com.brocrewz.backend.security.JwtUtils;
import com.brocrewz.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordResetTokenRepository tokenRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        
        String jwt = jwtUtils.generateJwtToken(authentication);
        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody PasswordResetRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Clear existing tokens
            tokenRepository.deleteByUser(user);

            String tokenStr = UUID.randomUUID().toString();
            PasswordResetToken resetToken = PasswordResetToken.builder()
                    .token(tokenStr)
                    .user(user)
                    .expiryDate(LocalDateTime.now().plusMinutes(15))
                    .build();
            tokenRepository.save(resetToken);
            
            // Send email asynchronously
            new Thread(() -> emailService.sendPasswordResetEmail(user.getEmail(), tokenStr)).start();
        }
        // Always return OK so as not to leak emails
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetConfirm request) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(request.getToken());
        if (tokenOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid token");
        }
        PasswordResetToken resetToken = tokenOpt.get();
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            tokenRepository.delete(resetToken);
            return ResponseEntity.badRequest().body("Token expired");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        
        tokenRepository.delete(resetToken);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Incorrect current password");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return ResponseEntity.ok().build();
    }
}
