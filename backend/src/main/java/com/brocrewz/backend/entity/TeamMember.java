package com.brocrewz.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "team_members")
public class TeamMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String role;
    private String phone;
    @Column(columnDefinition = "TEXT")
    private String description;
    private Integer displayOrder;
    private String category;
    @Column(columnDefinition = "TEXT")
    private String skills;
    private String imageUrl;

    public TeamMember() {}

    public TeamMember(Long id, String name, String role, String phone, String description, Integer displayOrder, String category, String skills, String imageUrl) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.phone = phone;
        this.description = description;
        this.displayOrder = displayOrder;
        this.category = category;
        this.skills = skills;
        this.imageUrl = imageUrl;
    }

    public static TeamMemberBuilder builder() {
        return new TeamMemberBuilder();
    }

    public static class TeamMemberBuilder {
        private Long id;
        private String name;
        private String role;
        private String phone;
        private String description;
        private Integer displayOrder;
        private String category;
        private String skills;
        private String imageUrl;

        public TeamMemberBuilder id(Long id) { this.id = id; return this; }
        public TeamMemberBuilder name(String name) { this.name = name; return this; }
        public TeamMemberBuilder role(String role) { this.role = role; return this; }
        public TeamMemberBuilder phone(String phone) { this.phone = phone; return this; }
        public TeamMemberBuilder description(String description) { this.description = description; return this; }
        public TeamMemberBuilder displayOrder(Integer displayOrder) { this.displayOrder = displayOrder; return this; }
        public TeamMemberBuilder category(String category) { this.category = category; return this; }
        public TeamMemberBuilder skills(String skills) { this.skills = skills; return this; }
        public TeamMemberBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public TeamMember build() { return new TeamMember(id, name, role, phone, description, displayOrder, category, skills, imageUrl); }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getDisplayOrder() { return displayOrder != null ? displayOrder : 0; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
