package com.brocrewz.backend.repository;

import com.brocrewz.backend.entity.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {

}
