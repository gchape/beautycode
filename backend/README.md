# BeautyCode Backend

Spring Boot 4.1 (Java 25) backend for BeautyCode, backed by:

- **PostgreSQL** — orders, newsletter subscribers (JPA/Hibernate)
- **DynamoDB** — product catalog (`dev`: embedded local instance, seeded on boot; `prod`: real AWS DynamoDB)
- **OpenLDAP** — user directory & authentication (`dev`: embedded LDAP; `prod`: real OpenLDAP container)
- **HashiCorp Vault** — secrets (JWT signing key, DB/LDAP passwords), fetched via Spring Cloud Config Server
- **Spring Cloud Config Server** — serves per-profile config (`backend.yaml`, `backend-dev.yaml`, `backend-prod.yaml`)
  from classpath + Vault

## Services

| Service                 | Port            | Purpose                                                        |
|-------------------------|-----------------|----------------------------------------------------------------|
| `backend`               | 8080            | Main API                                                       |
| `backend-config-server` | 8888 (internal) | Spring Cloud Config, backed by native + Vault property sources |
| `vault`                 | 8200            | Secrets store                                                  |
| `postgres`              | 5432            | Relational data (orders, newsletter)                           |
| `openldap`              | 389             | User directory (prod only; dev uses embedded LDAP)             |

## Running locally (dev profile)

Requires Docker + Docker Compose, and a `.env` file in this directory:

```env
VAULT_TOKEN=dev-only-vault-token
POSTGRES_USER=postgres
POSTGRES_PASSWORD=dev-only-password
```

Then:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yaml up --build
```

This brings up, in order: `vault` (dev mode, in-memory) → `vault-seed` (writes the JWT secret into Vault) → `postgres` →
`backend-config-server` → `backend`.

Once healthy:

- API: `http://localhost:8080`
- Vault UI/API: `http://localhost:8200` (token: `dev-only-vault-token`)
- Postgres: `localhost:5432` (for a DB client, if needed)

Login with the seeded LDAP admin user (`admin@beautycode.live` / `admin123`) or the seeded regular user (
`jdoe@beautycode.live` / `password123`), defined in `src/main/resources/ldap/schema.ldif`.

## Authentication

- LDAP bind authentication via `WebSecurityConfig` (`LdapBindAuthenticationManagerFactory`), searching the whole
  directory tree (`ou=users` and `ou=admins`).
- On successful login, `AuthController` issues an HS256 JWT (`JwtService`), signed with the secret stored in Vault at
  `secret/backend/{profile}` under `spring.security.jwt.secret`.
- `JwtAuthenticationFilter` validates the `Authorization: Bearer <token>` header on every request and populates the
  `SecurityContext`.
- Role mapping: LDAP entries under `ou=admins` get `ROLE_ADMIN`; everything else gets `ROLE_USER` (
  `OuBasedAuthoritiesPopulator`).

## Profiles

- **`dev`** — embedded LDAP + embedded DynamoDB (seeded with sample products on boot), real Postgres via Docker, verbose
  logging, `ddl-auto: update`.
- **`prod`** — real OpenLDAP, real AWS DynamoDB, real Postgres, `ddl-auto: validate` (schema must already exist — no
  auto-migration in prod), error-level logging.

## Known gotchas

- **Postgres major-version volume layout**: images use `/var/lib/postgresql` (not `/var/lib/postgresql/data`) as the
  mount point, required by `postgres:18+`'s new pg_ctlcluster-compatible layout. Don't mix data volumes across major
  versions.
- **Vault dev-mode healthcheck** requires `VAULT_ADDR=http://127.0.0.1:8200` set explicitly in the container
  environment — the Vault CLI defaults to `https://` otherwise and the healthcheck / any `vault status` call will fail
  to connect.
- **LDAP entity search base**: `User` (`@Entry(base = "")`) intentionally searches the whole directory (both `ou=users`
  and `ou=admins`), so admin accounts are visible to `UserRepository`. Don't narrow this back to `ou=users` only.