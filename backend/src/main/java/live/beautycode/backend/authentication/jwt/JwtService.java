package live.beautycode.backend.authentication.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import live.beautycode.backend.authentication.properties.JwtSecretProperties;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.Nullable;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@EnableConfigurationProperties(JwtSecretProperties.class)
public class JwtService {

    private final SecretKey key;
    private final long expirationSeconds;

    public JwtService(JwtSecretProperties jwtSecretConfigurationProperties) {
        this.key = Keys.hmacShaKeyFor(jwtSecretConfigurationProperties.secret().getBytes());
        this.expirationSeconds = jwtSecretConfigurationProperties.expirationSeconds();
    }

    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();
        List<@Nullable String> authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        return Jwts.builder()
                .subject(authentication.getName())
                .claim("authorities", authorities)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(expirationSeconds)))
                .signWith(key)
                .compact();
    }

    public String extractUsername(String token) {
        return parseClaims(token).getSubject();
    }

    @SuppressWarnings("unchecked")
    public List<String> extractAuthorities(String token) {
        return (List<String>) parseClaims(token).get("authorities", List.class);
    }

    public boolean isTokenValid(String token) {
        try {
            Claims claims = parseClaims(token);
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            log.warn("Invalid or expired JWT presented: {}", e.getMessage());
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
