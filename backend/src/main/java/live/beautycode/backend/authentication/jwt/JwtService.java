package live.beautycode.backend.authentication.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import live.beautycode.backend.authentication.properties.JwtSecretProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@EnableConfigurationProperties(JwtSecretProperties.class)
public class JwtService {

    private final SecretKey key;
    private final long expirationSeconds;

    public JwtService(JwtSecretProperties jwtSecretConfigurationProperties) {
        this.key = Keys.hmacShaKeyFor(jwtSecretConfigurationProperties.secret().getBytes());
        this.expirationSeconds = jwtSecretConfigurationProperties.expirationSeconds();
    }

    public String generateToken(UserDetails userDetails) {
        Instant now = Instant.now();

        List<String> authorities = userDetails.getAuthorities().stream()
                .map(Object::toString)
                .collect(Collectors.toList());

        return Jwts.builder()
                .subject(userDetails.getUsername())
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

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            Claims claims = parseClaims(token);
            return claims.getSubject().equals(userDetails.getUsername())
                    && claims.getExpiration().after(new Date());
        } catch (Exception e) {
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
