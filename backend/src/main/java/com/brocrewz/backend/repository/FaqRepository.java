package com.brocrewz.backend.repository;

import com.brocrewz.backend.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FaqRepository extends JpaRepository<Faq, Long> {
}
