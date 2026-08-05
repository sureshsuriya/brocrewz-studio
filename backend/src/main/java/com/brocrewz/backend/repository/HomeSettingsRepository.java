package com.brocrewz.backend.repository;

import com.brocrewz.backend.entity.HomeSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HomeSettingsRepository extends JpaRepository<HomeSettings, Long> {
}
