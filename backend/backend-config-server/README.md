# backend-config-server

Centralized configuration server for the `beauty-code` backend microservices, built on **Spring Cloud Config Server**.
Serves externalized configuration to client services (`backend`, `checkout`, etc.) from a Git repository, with
sensitive values layered in from **HashiCorp Vault**.

## Overview

- **Git backend** — structural/non-sensitive config (LDAP base DN, AWS region, table names, log levels) lives in [
  `beauty-code/config`](../config) on the `main` branch.
- **Vault backend** — secrets (JWT signing key, LDAP admin credentials, etc.) are resolved from Vault's KV v2 secret
  engine and merged into the response alongside the git-sourced properties.
- Clients fetch their config via `spring.config.import: configserver:...` and never talk to Git or Vault directly.

## Requirements

- Java 25
- A running Vault instance (dev mode is fine locally)
- Network access to `https://github.com/gchape/beauty-code.git` (public repo, no auth needed)

## Running locally

**1. Start Vault (dev mode):**

```bash
docker run --cap-add=IPC_LOCK -d --name=dev-vault \
  -p 8200:8200 \
  -e 'VAULT_DEV_ROOT_TOKEN_ID=dev-root-token' \
  hashicorp/vault
```

**2. Seed dev secrets:**

```bash
export VAULT_ADDR=http://localhost:8200
export VAULT_TOKEN=dev-root-token

vault kv put secret/backend-dev \
  security.jwt.secret=dev-only-secret-change-me-please-1234567890
```

**3. Start the config server:**

```bash
./mvnw spring-boot:run
```

The server starts on **port `8888`** with the `dev` profile active by default.

**4. Verify it's serving config:**

```bash
curl http://localhost:8888/backend/dev
```

You should see a merged JSON response combining `config/backend.yaml`, `config/backend-dev.yaml`, and the Vault-sourced
`secret/backend-dev` values.

## Configuration resolution order

For a client with `spring.application.name=backend` and active profile `dev`, properties are resolved and merged in this
order (later entries win on conflicts):

1. `config/application.yaml` — shared defaults across all services (if present)
2. `config/backend.yaml` — profile-agnostic backend config
3. `config/backend-dev.yaml` — dev-specific backend config
4. `secret/backend` — Vault, profile-agnostic secrets
5. `secret/backend-dev` — Vault, dev-specific secrets

## Profiles

| Profile | Purpose                                           | Logging                                                |
|---------|---------------------------------------------------|--------------------------------------------------------|
| `dev`   | Local development, embedded LDAP, verbose logging | `org.springframework.cloud.config: debug`              |
| `prod`  | Production, external LDAP/AWS, minimal logging    | `root: warn`, `org.springframework.cloud.config: info` |

Set via `SPRING_PROFILES_ACTIVE` env var; defaults to `dev` if unset.

## Environment variables

| Variable     | Default     | Description           |
|--------------|-------------|-----------------------|
| `VAULT_HOST` | `localhost` | Vault server hostname |
| `VAULT_PORT` | `8200`      | Vault server port     |

## Client integration

Client services import config like this:

```yaml
spring:
  config:
    import: "configserver:${CONFIG_SERVER_URI:http://localhost:8888}"
  cloud:
    config:
      token: ${VAULT_TOKEN}
```

The `token` is forwarded to Vault by the config server when resolving that client's Vault-backed secrets.

## Docker Compose

When run alongside other services via Compose, reference this service by its Compose service name (e.g.
`backend-config-server`) rather than `localhost`:

```yaml
environment:
  CONFIG_SERVER_URI: http://backend-config-server:8888
```

## Notes

- `spring.cloud.compatibility-verifier.enabled=false` is required — the verifier's compatibility table lags behind
  Spring Boot 4.1.0 support in Spring Cloud 2025.1.2, even though the two are officially compatible.
- Git repo is cloned on startup (`clone-on-start: true`) and force-pulled on refresh (`force-pull: true`) to avoid stale
  local clone drift.
- `refresh-rate: 0` means the server checks git for updates on every request — fine for dev, but should be increased (
  e.g. `30`) before any real load.