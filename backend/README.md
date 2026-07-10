# BeautyCode Backend

Spring Boot backend for BeautyCode: product catalog, JWT-based auth against
an LDAP directory, and a Spring Cloud Config Server submodule for externalized
configuration. Data is stored in DynamoDB using a single-table design.

## Modules

```
backend/
├── backend-config-server/   # Spring Cloud Config Server (separate Spring Boot app)
└── src/                     # Main backend application
```

The config server is a standalone Spring Boot app (`BackendConfigServerApplication`)
that serves `backend.yaml` / `backend-dev.yaml` / `backend-prod.yaml` from its
own `resources/config` to the main backend at startup, via Spring Cloud Config.

## Tech stack

- **Spring Boot** (Web, Security)
- **Spring LDAP** — authentication and user lookups against an LDAP directory
- **JWT** (`io.jsonwebtoken` / jjwt) — stateless auth, HMAC-signed tokens
- **DynamoDB Enhanced Client** — single-table data access for products
- **DynamoDB Embedded** (`software.amazon.dynamodb.services.local.embedded`) —
  used only under the `dev` profile, so local development needs no real AWS
  DynamoDB table
- **Lombok**, **jspecify** (`@NullMarked` null-safety annotations)
- **Spring Cloud Config** — externalized YAML config served by `backend-config-server`

## Architecture

### Auth flow

```
POST /api/login {email, password}
        │
        ▼
AuthController → AuthenticationManager (LDAP bind)
        │
        ▼
JwtService.generateToken() — HMAC-signed, includes authorities as a claim
        │
        ▼
{ "token": "..." } returned to client
```

Every subsequent request carries `Authorization: Bearer <token>`.
`JwtAuthenticationFilter` (a `OncePerRequestFilter`) validates the token,
extracts the username and authorities, and populates the
`SecurityContextHolder` — no server-side session, `SessionCreationPolicy.STATELESS`.

User authentication itself binds directly against LDAP
(`LdapBindAuthenticationManagerFactory`); users are matched by `mail={0}`
and group membership is resolved via `DefaultLdapAuthoritiesPopulator`
against `ou=groups`.

### Authorization rules (`WebSecurityConfig`)

| Route                  | Access        |
|------------------------|---------------|
| `POST /api/login`      | public        |
| `GET /api/products/**` | public        |
| `GET /api/users/**`    | authenticated |
| anything else          | denied        |

CORS is restricted to `localhost`, `localhost:5173` (Vite dev server), and
`https://beautycode.live`.

### Product catalog

- `Category` is a closed enum (`EPILATOR`, `HAIR_DRYER`, `FACIAL_CLEANSER`)
  with URL-friendly `toString()` (`epilator`, `hair-dryer`, `facial-cleanser`).
  `CategoryConverter` lets Spring bind the query param `?category=hair-dryer`
  straight into the enum.
- `Product` is a `@DynamoDbBean` mapped onto a single table: `PK`/`SK` are
  both `PRODUCT#<id>`, `Type` and `Category` are GSI partition keys
  (`ProductsByType`, `ProductsByCategory`), matching the DynamoDB table
  defined in the infra Terraform.
- `ProductRepository` wraps the DynamoDB Enhanced Client: `save` uses a
  conditional `attribute_not_exists(PK)` write to avoid overwriting existing
  products; reads go through `findById`, `findAll` (via the `ProductsByType`
  GSI), and `findByCategory` (via `ProductsByCategory`).
- `ProductService` adds domain rules (`ProductAlreadyExistsException`,
  `ProductNotFoundException`) on top of the repository.

### Users

- `UserController` exposes `GET /api/users/profile`, resolving the
  authenticated principal's LDAP attributes (`givenName`, `sn`, `mail`,
  `telephoneNumber`) into a `UserDto`. There's no local user table — LDAP is
  the source of truth for user identity.

### Error handling

`GlobalExceptionHandler` (`@RestControllerAdvice`) maps domain exceptions to
RFC 7807 `ProblemDetail` responses:

| Exception                       | Status                                 |
|---------------------------------|----------------------------------------|
| `UserNotFoundException`         | 404                                    |
| `UserAlreadyExistsException`    | 409                                    |
| `ProductNotFoundException`      | 404                                    |
| `ProductAlreadyExistsException` | 409                                    |
| `AuthenticationException`       | 401                                    |
| `AccessDeniedException`         | 403                                    |
| anything else                   | 500 (logged, generic message returned) |

## Configuration

Config is externalized via `backend-config-server` and profile-specific
YAML (`application.yaml`, plus `docker-compose.dev.yaml` /
`docker-compose.prod.yaml` for environment wiring). Key properties used by
the code:

```yaml
spring:
  security:
    jwt:
      secret: <hmac-secret>
      expiration-seconds: <token-ttl>
  ldap:
    urls: <ldap-url>
    base: <base-dn>
    username: <bind-dn>
    password: <bind-password>
  cloud:
    aws:
      dynamodb:
        table-name: BeautyCode
```

## Running locally

The `dev` profile swaps DynamoDB for an in-memory embedded instance
(`EmbeddedDynamoDbConfig`), auto-creating the `BeautyCode` table with both
GSIs and seeding it with sample products on startup — no AWS credentials or
real table needed for local dev.

```bash
# from backend/
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

For anything beyond product browsing (login, user profile) you still need a
reachable LDAP server — see `resources/ldap/schema.ldif` for the schema used
in dev/testing.

### Via Docker Compose

```bash
docker compose -f docker-compose.dev.yaml up --build
```

This is the same flow the EC2 instance runs in production (see the infra
repo's Terraform), just pointed at `docker-compose.prod.yaml` there instead.

## API summary

| Method | Path                 | Auth          | Description                                 |
|--------|----------------------|---------------|---------------------------------------------|
| `POST` | `/api/login`         | public        | Authenticate against LDAP, returns a JWT    |
| `GET`  | `/api/products`      | public        | List products, optional `?category=` filter |
| `GET`  | `/api/products/{id}` | public        | Get a single product                        |
| `GET`  | `/api/users/profile` | authenticated | Current user's LDAP profile                 |

## Known gaps / things to revisit

- `Admin` and `User` (top-level classes in `admin/` and `user/`) are empty
  placeholders — no fields, no behavior yet.
- There's no `POST`/`PUT`/`DELETE` product endpoint exposed on the
  controller yet, even though `ProductService.save()` exists — product
  creation currently has no HTTP entry point.
- JWT secret and LDAP bind credentials are plain config values — make sure
  `backend.yaml`/`backend-prod.yaml` pull these from Vault rather than
  committing them (the EC2 instance already runs a Vault container per the
  infra setup, worth wiring this up if not done yet).