package tech.provokedynamic.backendconfigserver.config;

import org.springframework.boot.health.contributor.Health;
import org.springframework.boot.health.contributor.HealthIndicator;
import org.springframework.stereotype.Component;
import org.springframework.vault.core.VaultTemplate;

@Component
public class VaultHealthIndicator implements HealthIndicator {

    private final VaultTemplate vaultTemplate;

    public VaultHealthIndicator(VaultTemplate vaultTemplate) {
        this.vaultTemplate = vaultTemplate;
    }

    @Override
    public Health health() {
        try {
            var health = vaultTemplate.opsForSys().health();
            return health.isInitialized() && !health.isSealed()
                    ? Health.up().withDetail("sealed", false).build()
                    : Health.down().withDetail("sealed", health.isSealed()).build();
        } catch (Exception e) {
            return Health.down(e).build();
        }
    }
}
