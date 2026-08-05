package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String subject;
    @Column(columnDefinition = "TEXT")
    private String message;
    private LocalDateTime createdAt;
    
    @Builder.Default
    private boolean isRead = false;
    
    @Builder.Default
    private boolean isReplied = false;
    
    @Column(columnDefinition = "TEXT")
    private String replyNotes;
}
