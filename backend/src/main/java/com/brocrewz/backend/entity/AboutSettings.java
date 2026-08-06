package com.brocrewz.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "about_settings")
public class AboutSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String companyStory;
    @Column(columnDefinition = "TEXT")
    private String mission;
    @Column(columnDefinition = "TEXT")
    private String vision;
    @Column(columnDefinition = "TEXT")
    private String coreValuesJson;
    private String heroImageUrl;

    public AboutSettings() {}

    public AboutSettings(Long id, String companyStory, String mission, String vision, String coreValuesJson, String heroImageUrl) {
        this.id = id;
        this.companyStory = companyStory;
        this.mission = mission;
        this.vision = vision;
        this.coreValuesJson = coreValuesJson;
        this.heroImageUrl = heroImageUrl;
    }

    public static AboutSettingsBuilder builder() {
        return new AboutSettingsBuilder();
    }

    public static class AboutSettingsBuilder {
        private Long id;
        private String companyStory;
        private String mission;
        private String vision;
        private String coreValuesJson;
        private String heroImageUrl;

        public AboutSettingsBuilder id(Long id) { this.id = id; return this; }
        public AboutSettingsBuilder companyStory(String companyStory) { this.companyStory = companyStory; return this; }
        public AboutSettingsBuilder mission(String mission) { this.mission = mission; return this; }
        public AboutSettingsBuilder vision(String vision) { this.vision = vision; return this; }
        public AboutSettingsBuilder coreValuesJson(String coreValuesJson) { this.coreValuesJson = coreValuesJson; return this; }
        public AboutSettingsBuilder heroImageUrl(String heroImageUrl) { this.heroImageUrl = heroImageUrl; return this; }
        public AboutSettings build() { return new AboutSettings(id, companyStory, mission, vision, coreValuesJson, heroImageUrl); }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCompanyStory() { return companyStory; }
    public void setCompanyStory(String companyStory) { this.companyStory = companyStory; }

    public String getMission() { return mission; }
    public void setMission(String mission) { this.mission = mission; }

    public String getVision() { return vision; }
    public void setVision(String vision) { this.vision = vision; }

    public String getCoreValuesJson() { return coreValuesJson; }
    public void setCoreValuesJson(String coreValuesJson) { this.coreValuesJson = coreValuesJson; }

    public String getHeroImageUrl() { return heroImageUrl; }
    public void setHeroImageUrl(String heroImageUrl) { this.heroImageUrl = heroImageUrl; }
}
