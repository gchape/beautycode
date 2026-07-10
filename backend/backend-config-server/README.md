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
├── application.yaml        # config-server's own settings (port, backend, etc.)
└── config/
    ├── backend.yaml         # shared config, all profiles
    ├── backend-dev.yaml      # dev-profile overrides (e.g. embedded DynamoDB, local LDAP)
    └── backend-prod.yaml     # prod-profile overrides (real DynamoDB table, real LDAP, secrets)
```

Spring Cloud Config resolves these by convention: a client app named
`backend` requesting the `dev` profile gets `backend.yaml` merged with
`backend-dev.yaml`; requesting `prod` gets `backend.yaml` merged with
`backend-prod.yaml`.

## How the main backend consumes it

The backend app points at this server (typically via
`spring.config.import=configserver:http://backend-config-server:PORT` or
equivalent bootstrap config) and requests config for its active profile at
startup. This is why `docker-compose.yml` brings the config server up
alongside `vault` and `backend` — the backend won't have a complete config
(JWT secret, LDAP connection details, DynamoDB table name) until it's
fetched it from here.

```
docker compose up
     │
     ├── vault                  (secrets)
     ├── backend-config-server  (serves backend.yaml / backend-{profile}.yaml)
     └── backend                (fetches config from config-server, then starts)
```

## Running standalone

```bash
# from backend/backend-config-server/
./mvnw spring-boot:run
```

Once up, config for a given app/profile is fetched at:

```
GET /{application}/{profile}
# e.g.
GET /backend/dev
GET /backend/prod
```

## Notes

- This module has its own `pom.xml`, `.mvn`, and `Dockerfile` — it's built
  and deployed as an independent Spring Boot app, not a library the backend
  depends on.
- Actual secret values (LDAP bind password, JWT signing secret, DynamoDB
  credentials) shouldn't live directly in `backend-prod.yaml` in plaintext —
  given Vault is already part of the compose stack, prefer referencing Vault
  paths from the served config rather than committing raw secrets here.
- There's no Spring Cloud Config `git`-backed repository configured here —
  config is served straight from this app's own bundled `resources/config`
  files, so updating config means rebuilding/redeploying this module rather
  than pushing to a separate config repo. Worth knowing since it's a
  different model from the more common git-backed Config Server setup.