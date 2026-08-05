package com.brocrewz.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    @Value("${brocrewz.app.jwtSecret}")
    private String jwtSecret;

    @Value("${brocrewz.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {
        String username = authentication.getName();
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key())
                .compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().verifyWith((javax.crypto.SecretKey) key()).build()
                .parseSignedClaims(token).getPayload().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().verifyWith((javax.crypto.SecretKey) key()).build().parseSignedClaims(authToken);
            return true;
        } catch (Exception e) {
            // log error
        }
        return false;
    }
}
