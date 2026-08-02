import os

base_dir = r"C:\Users\sures\.gemini\antigravity-ide\scratch\brocrewz-studio\backend\src\main\java\com\brocrewz\backend"

entities = {
    "User": """package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String role;
}
""",
    "ServicePlan": """package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "service_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServicePlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String planType; // SINGLE, MONTHLY
    @Column(columnDefinition = "TEXT")
    private String features; // JSON array of strings or comma-separated
}
""",
    "TeamMember": """package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "team_members")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String role;
    private String phone;
    @Column(columnDefinition = "TEXT")
    private String skills; // comma separated
    private String imageUrl;
}
""",
    "PortfolioItem": """package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "portfolio_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PortfolioItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String category;
    private String imageUrl;
    private String videoUrl;
    private String beforeImageUrl;
    private String afterImageUrl;
}
""",
    "Testimonial": """package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "testimonials")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Testimonial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String clientName;
    private String feedback;
    private Integer rating;
}
""",
    "ContactMessage": """package com.brocrewz.backend.entity;

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
}
"""
}

repositories = {name: f"""package com.brocrewz.backend.repository;

import com.brocrewz.backend.entity.{name};
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface {name}Repository extends JpaRepository<{name}, Long> {{
{f'    Optional<{name}> findByEmail(String email);' if name == 'User' else ''}
}}
""" for name in entities.keys()}


for name, content in entities.items():
    with open(os.path.join(base_dir, "entity", f"{name}.java"), "w") as f:
        f.write(content)

for name, content in repositories.items():
    with open(os.path.join(base_dir, "repository", f"{name}Repository.java"), "w") as f:
        f.write(content)

print("Entities and Repositories generated successfully.")
