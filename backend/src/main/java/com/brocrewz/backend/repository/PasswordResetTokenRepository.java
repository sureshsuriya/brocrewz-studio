package com.brocrewz.backend.repository;

import com.brocrewz.backend.entity.PasswordResetToken;
import com.brocrewz.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    
    @Transactional
    void deleteByUser(User user);
}
