# BeautyCode Backend Config Server

Spring Cloud Config Server. Its only job is to serve the main backend
application's YAML configuration over HTTP, keyed by profile, so secrets and
environment-specific settings live in one place instead of being baked into
the backend's jar.

## What it is

```java

@SpringBootConfiguration(proxyBeanMethods = false)
@EnableAutoConfiguration
@ComponentScan(basePackages = "tech.provokedynamic.backendconfigserver.config")
@EnableConfigServer
public class BackendConfigServerApplication { ...
}
```

A minimal Spring Boot app with `@EnableConfigServer` — no controllers, no
business logic. `ComponentScan` is deliberately narrowed to the `config`
package only, since this app has nothing else to scan.

## Config files served

```
src/main/resources/
├── application.yaml        # config-server's own settings (port, actuator, logging)
└── config/
    ├── backend.yaml         # shared config, all profiles
    ├── backend-dev.yaml      # dev-profile overrides (e.g. embedded DynamoDB, local LDAP)
    └── backend-prod.yaml     # prod-profile overrides (real DynamoDB table, real LDAP)
```

Config is resolved via two composed sources, not a git repo (see "Config
sources" below):

- **Native (classpath)** — `spring.cloud.config.server.native.search-locations`
  points at `classpath:/config`, so `backend.yaml`/`backend-{profile}.yaml`
  are read straight out of this module's own bundled resources.
- **Vault (KV v2)** — secrets are resolved directly from Vault at
  `secret/backend` (shared) and `secret/backend/{profile}` (profile-specific,
  via `profile-separator: /`), authenticated with a token.

A client app named `backend` requesting profile `dev` gets `backend.yaml`
merged with `backend-dev.yaml` from the native source, plus whatever's at
`secret/backend` and `secret/backend/dev` in Vault, layered on top.

## How the main backend consumes it

The backend app points at this server (`spring.config.import=configserver:http://backend-config-server:8888`
or equivalent) and requests config for its active profile at startup. This
is why `docker-compose.yml` brings the config server up alongside `vault`
and `backend` — the backend won't have a complete config (JWT secret, LDAP
connection details, DynamoDB table name) until it's fetched it from here.

```
docker compose up
     │
     ├── vault                  (secrets)
     ├── backend-config-server  (serves backend.yaml/backend-{profile}.yaml + Vault secrets)
     └── backend                (fetches config from config-server, then starts)
```

## Running standalone

```bash
# from backend/backend-config-server/
./mvnw spring-boot:run
```

Requires a reachable Vault instance (`VAULT_HOST`/`VAULT_PORT`/`VAULT_TOKEN`
env vars, defaulting to `127.0.0.1:8200` with a dev-only token). Once up,
config for a given app/profile is fetched at:

```
GET /{application}/{profile}
# e.g.
GET /backend/dev
GET /backend/prod
```

## Logging

Logs to both console and a rolling file
(`${LOG_DIR:logs}/backend-config-server.log`, size+time-based rotation,
10MB per file, 7-day/50MB history cap) in every profile. Levels differ by
profile:

| Profile | `root` | `org.springframework.cloud.config`         |
|---------|--------|--------------------------------------------|
| dev     | `info` | `debug` — full property-resolution tracing |
| prod    | `warn` | inherited from `root` (`warn`)             |

`LOG_DIR` should point at a mounted volume in any containerized deployment
— otherwise the log file lives inside the container's ephemeral filesystem
and is lost on restart/recreation.

## Actuator / management endpoints

Locked down by default (`management.access.default: none`,
`management.endpoints.web.exposure.exclude: "*"`), then selectively
reopened per profile — access and exposure are two separate gates, both
need to be granted for an endpoint to actually respond:

| Profile | Exposed endpoints        | Notes                                                                   |
|---------|--------------------------|-------------------------------------------------------------------------|
| dev     | `health`, `env`, `beans` | `env`/`beans` useful for debugging config resolution and wiring locally |
| prod    | `health` only            | minimal surface area                                                    |

JMX is disabled entirely (`spring.jmx.enabled: false`) — nothing here needs
runtime inspection via `jconsole`/VisualVM, and it's one less implicit
surface to account for.

**Careful with `env` in dev**: this server resolves live Vault secrets into
its environment. If `env` is ever exposed with `show-values: always` (it
currently is not — access is `unrestricted` but value-masking still
applies by default), resolved secret values would be readable over HTTP.
Don't loosen this without deliberately deciding you want that.

## Notes

- This module has its own `pom.xml`, `.mvn`, and `Dockerfile` — it's built
  and deployed as an independent Spring Boot app, not a library the backend
  depends on.
- **No git-backed config repo.** Config is served from two sources only:
  this app's own bundled `resources/config` files (native) and Vault
  (secrets). There's no external git repository in the loop — updating
  non-secret config means rebuilding/redeploying this module, and updating
  secrets means writing to Vault directly. Worth knowing since it's a
  different model from the more common git-backed Config Server setup.
- Secrets (LDAP bind password, JWT signing secret, DynamoDB credentials)
  should live in Vault, not in `backend-prod.yaml` in plaintext — the
  native source is for structural/non-sensitive config only.

## Possible follow-ups (not yet implemented)

- **A Vault-specific health indicator.** The default `health` endpoint
  doesn't distinguish "config server is up" from "config server is up but
  Vault is unreachable/sealed" — a custom `HealthIndicator` wired to
  `VaultTemplate.opsForSys().health()` would surface that failure mode
  directly instead of only showing up once the backend fails to start.
- **A config-source diagnostics endpoint** reporting which classpath
  config files and Vault paths were actually resolved for a given
  app/profile, to shortcut having to enable `debug` logging when config
  resolution isn't behaving as expected.