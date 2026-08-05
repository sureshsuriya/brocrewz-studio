package com.brocrewz.backend.repository;

import com.brocrewz.backend.entity.ThemeSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThemeSettingsRepository extends JpaRepository<ThemeSettings, Long> {
}
