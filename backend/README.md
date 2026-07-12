# backend

Spring Boot backend for BeautyCode, plus a Spring Cloud Config Server that serves config from Vault + local YAML.

## Modules

```
backend/
├── src/                      # backend (main app) — port 8080
├── backend-config-server/    # Spring Cloud Config Server — port 8888
├── Dockerfile
├── docker-compose.yml         # base: vault, backend-config-server, backend
├── docker-compose.dev.yaml    # dev overrides: local postgres, embedded LDAP, vault dev mode
└── docker-compose.prod.yaml   # prod overrides: openldap, vault w/ file storage, vault-seed
```

## Stack

- **backend** — Spring Boot 4.1 / Java 25. LDAP auth (bind-based) + JWT issuance, DynamoDB for products, Postgres/JPA for orders + newsletter, virtual threads enabled.
- **backend-config-server** — Spring Cloud Config Server, `native` profile serves `config/backend*.yaml` from the classpath, `vault` profile pulls secrets from HashiCorp Vault (KV v2, path `secret/backend/{profile}`).
- **Vault** — the only thing genuinely gated behind it right now is `spring.security.jwt.secret` (JWT signing key) and `spring.ldap.password`/`spring.ldap.username` (LDAP admin bind creds). Postgres credentials come from container env vars directly, not Vault.

## Config resolution order (prod)

`backend` boots → fetches config from `backend-config-server` (`spring.config.import: configserver:...`) → config server merges:

1. `config/backend.yaml` (shared defaults)
2. `config/backend-prod.yaml` (profile-specific — env-var-driven: `AWS_REGION`, `AWS_DYNAMODB_TABLE_NAME`, `LDAP_URLS`, `POSTGRES_*`)
3. Vault `secret/backend/prod` (`spring.security.jwt.secret`, `spring.ldap.username`, `spring.ldap.password`)

JWT auth: `JwtSecretProperties` binds `spring.security.jwt.secret` → used to build an HMAC key for `NimbusJwtEncoder`/`NimbusJwtDecoder` (`spring-security-oauth2-jose`, HS256). Validated on every request in `JwtAuthenticationFilter`.

LDAP auth: `WebSecurityConfig` wires an `LdapBindAuthenticationManagerFactory` — searches for the user by `mail={0}` under the LDAP base, then binds as that user to verify the password. The _search_ step itself needs an authenticated bind (`spring.ldap.username`/`password`, from Vault) unless your OpenLDAP ACLs permit anonymous search.

## Running locally (dev)

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yaml up -d
```

Dev profile uses:

- Embedded DynamoDB (`EmbeddedDynamoDbConfig`, `@Profile("dev")`) — auto-creates the table + seeds products on startup, no AWS needed.
- Embedded LDAP (`spring.ldap.embedded`, port 8389) seeded from `classpath:ldap/schema.ldif` — includes a test user (`jdoe@beautycode.live` / `password123`) and admin (`admin@beautycode.live` / `admin123`).
- Local Postgres container, port 5432 exposed to `127.0.0.1` only.
- Vault in **dev mode** (`VAULT_DEV_ROOT_TOKEN_ID`) — auto-unsealed, in-memory, seeded with a hardcoded dev JWT secret via `vault-seed`. Never use dev mode outside local dev — it disables persistence and requires no unseal.

Backend on `:8080`, config server on `:8888` (internal only, not exposed to the host).

## Running in prod (this is what `infra/templates/backend_init.sh.tftpl` runs on EC2)

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yaml up -d
```

Prod adds: real OpenLDAP (seeded once via `ldap-seed` + bootstrap LDIF), Vault with file storage + AWS KMS auto-unseal (config supplied externally at `/vault/config/vault.hcl`, written by the EC2 boot script — see `infra/README.md`), and `vault-seed` populating `secret/backend/prod` from env vars (`JWT_SECRET`, `LDAP_ADMIN_PASSWORD`) that Terraform interpolates into `.env` at boot.

**Required env vars in `.env`** (written by Terraform, not checked into git):

```
JWT_SECRET=...
LDAP_ADMIN_PASSWORD=...
POSTGRES_USER=...
POSTGRES_PASSWORD=...
POSTGRES_DB=beautycode
VAULT_TOKEN=...   # appended after Vault init/unseal, not set by Terraform directly
```

## Redeploying an in-place code change (without recreating the EC2 instance)

```bash
aws ssm start-session --target <instance-id>
cd /opt/beauty-code/backend
git pull
docker compose -f docker-compose.yml -f docker-compose.prod.yaml up -d --build backend backend-config-server
```

Vault/Postgres/OpenLDAP data isn't touched by this — only application containers rebuild.

## Known gaps / things to revisit

- **LDAP bind creds are single points of trust** — if `spring.ldap.username`/`password` are ever wrong or missing in Vault, the app falls back to an anonymous LDAP search, which either fails outright or silently succeeds with broader access than intended depending on your OpenLDAP ACLs. Worth adding a startup health check that fails fast if the LDAP bind can't authenticate, rather than discovering it at first login attempt.
- **`VaultHealthIndicator`** exists in `backend-config-server` but isn't exposed — `management.endpoints.web.exposure` is `exclude: "*"` / `include: health` depending on profile. Confirm your monitoring actually polls `/actuator/health` if you want Vault-seal alerts.
- **No DB migrations tool** (Flyway/Liquibase) — `hibernate.ddl-auto: validate` in prod means schema changes require a manual step before deploy, not just a code push.
