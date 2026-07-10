# BeautyCode

Full-stack e-commerce app for BeautyCode: a React SPA storefront, a Spring
Boot backend (JWT auth over LDAP, DynamoDB-backed product catalog), a Spring
Cloud Config Server for externalized configuration, and Terraform-managed
AWS infrastructure to run all of it.

## Repo layout

```
.
├── frontend/                # React + TypeScript SPA (Vite)
├── backend/
│   ├── backend-config-server/   # Spring Cloud Config Server
│   └── src/                     # Main Spring Boot backend
└── infra/                    # Terraform: DynamoDB, S3, CloudFront, EC2
```

Each has its own README with full detail:

- [`frontend/README.md`](./frontend/README.md) — components, routing, auth
  flow, data fetching, env vars, local dev
- [`backend/README.md`](./backend/README.md) — auth flow, product catalog,
  DynamoDB model, API summary, local dev
- [`backend/backend-config-server/README.md`](./backend/backend-config-server/README.md) —
  what it serves, how the backend consumes it, running standalone
- [`cloud/README.md`](./cloud/README.md) — what Terraform creates, deploy
  steps, DNS setup, cost/architecture notes

## Architecture at a glance

```
Browser
  │
  ▼
CloudFront (single distribution, one ACM cert for all three domains)
  │
  ├── beautycode.live, www  →  S3 (frontend build)
  ├── /images/*             →  S3 (product images)
  └── api.beautycode.live   →  EC2 (nginx → Spring Boot :8080)
                                        │
                                        ├── backend-config-server (Vault + config)
                                        ├── LDAP (auth)
                                        └── DynamoDB (product catalog)
```

CloudFront is the single HTTPS entry point for everything — frontend,
images, and API — so there's no ALB and no certbot; TLS is issued and
renewed automatically by ACM/CloudFront. See `infra/README.md` for the full
request-flow breakdown and deploy steps.

## Request flow, end to end

1. Browser loads `beautycode.live` → CloudFront serves the React build from
   S3.
2. The SPA calls `api.beautycode.live/api/...` (see `frontend/services/api.ts`)
   → CloudFront routes `/api/*` to the EC2 backend over internal HTTP.
3. Login (`POST /api/login`) binds against LDAP, returns a JWT
   (`backend/authentication`).
4. The frontend stores the JWT and attaches it as `Authorization: Bearer`
   on subsequent requests.
5. Product reads (`GET /api/products`) hit DynamoDB via the Enhanced Client
   (`backend/product`); user profile reads (`GET /api/users/profile`) hit
   LDAP directly.
6. The backend's own config (JWT secret, LDAP connection, DynamoDB table
   name) comes from `backend-config-server` at startup, which in turn is
   meant to source secrets from the Vault container running alongside it.

## Quickstart (local dev)

```bash
# 1. Backend config server
cd backend/backend-config-server
./mvnw spring-boot:run

# 2. Backend (dev profile — embedded DynamoDB, seeded with sample products)
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
# needs a reachable LDAP server for login/profile — see backend/README.md

# 3. Frontend
cd frontend
cp .env.example .env   # set VITE_API_URL=http://localhost:8080/api
npm install
npm run dev
```

## Known cross-cutting gaps

- The frontend calls `POST /users/register` and `GET /users/orders`, but
  neither endpoint exists on the backend yet (`UserController` only has
  `GET /users/profile`). Registration and order history will fail until
  these are implemented.
- `ProductService.save()` exists on the backend but has no controller route
  — there's currently no way to create a product over HTTP.
- Secrets (JWT signing key, LDAP bind password) should be sourced from
  Vault via the config server rather than committed in plaintext YAML — the
  infra already runs Vault alongside the backend, so this is mostly a
  wiring gap rather than a missing piece.

## Deploying

See `infra/README.md` for the full Terraform deploy flow — in short:
create and DNS-validate the ACM cert first (two-phase apply, since DNS is
managed externally at name.com), then apply everything else and point
`beautycode.live` / `www` / `api.beautycode.live` at the same CloudFront
distribution.
