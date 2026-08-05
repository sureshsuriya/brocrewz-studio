package com.brocrewz.backend.repository;

import com.brocrewz.backend.entity.SiteSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteSettingsRepository extends JpaRepository<SiteSettings, Long> {
}
