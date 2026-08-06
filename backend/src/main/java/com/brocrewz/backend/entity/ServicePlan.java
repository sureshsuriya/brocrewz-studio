package com.brocrewz.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "service_plans")
public class ServicePlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String planType;
    @Column(columnDefinition = "TEXT")
    private String features;

    public ServicePlan() {}

    public ServicePlan(Long id, String name, String description, BigDecimal price, String planType, String features) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.planType = planType;
        this.features = features;
    }

    public static ServicePlanBuilder builder() {
        return new ServicePlanBuilder();
    }

    public static class ServicePlanBuilder {
        private Long id;
        private String name;
        private String description;
        private BigDecimal price;
        private String planType;
        private String features;

        public ServicePlanBuilder id(Long id) { this.id = id; return this; }
        public ServicePlanBuilder name(String name) { this.name = name; return this; }
        public ServicePlanBuilder description(String description) { this.description = description; return this; }
        public ServicePlanBuilder price(BigDecimal price) { this.price = price; return this; }
        public ServicePlanBuilder planType(String planType) { this.planType = planType; return this; }
        public ServicePlanBuilder features(String features) { this.features = features; return this; }
        public ServicePlan build() { return new ServicePlan(id, name, description, price, planType, features); }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getPlanType() { return planType; }
    public void setPlanType(String planType) { this.planType = planType; }

    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }
}
