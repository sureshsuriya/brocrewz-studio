package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "faqs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Faq {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;
    @Column(columnDefinition = "TEXT")
    private String answer;
    
    private Integer displayOrder;
}
