package com.brocrewz.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "testimonials")
public class Testimonial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String clientName;
    @Column(columnDefinition = "TEXT")
    private String feedback;
    private Integer rating;

    public Testimonial() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public Integer getRating() { return rating != null ? rating : 5; }
    public void setRating(Integer rating) { this.rating = rating; }
}
