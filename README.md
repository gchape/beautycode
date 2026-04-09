# BeautyCode
## Table of Contents
### Frontend
- [Lighthouse Scores](#lighthouse-scores)
- [Performance Optimizations](#performance-optimizations)
- [Asset Handling](#asset-handling)
- [SEO Improvements](#seo-improvements)
- [Frontend Architecture](#frontend-architecture)
### Backend
- [Backend Overview](#backend-overview)
- [Security](#security)
### Database
- [DynamoDB Access](#dynamodb-access)
- [Access Patterns](#access-patterns)
### Infrastructure
- [Docker Setup](#docker-setup)
- [Reverse Proxy](#reverse-proxy)
- [Nginx Performance](#nginx-performance)
---
## Frontend
### Lighthouse Scores
| Performance | Accessibility | Best Practices | SEO |
| ----------- | ------------- | -------------- | --- |
| 92          | 94            | 100            | 100 |
### Performance Optimizations
Removed Google Fonts (Material Symbols) and replaced them with unicode characters (`+` `−` `›`) and inline SVG components.
### Asset Handling
Fixed Nginx asset routing for `/assets/` and `/font/`.
### SEO Improvements
- Open Graph tags
- Canonical URL
- `robots.txt`
- `sitemap.xml`
### Frontend Architecture
The frontend is organized into self-contained feature modules under `src/features/`.
Each feature owns its components, context, actions, and providers.
Public exports go through a single `index.js` barrel file per feature.

```
src/
├── features/
│   ├── auth/          — login, register, actions
│   ├── cart/          — cart state, reducer, components
│   ├── product/       — catalog, categories, context
│   ├── profile/       — profile page, loader
│   ├── navbar/
│   ├── footer/
│   ├── home/
│   └── middleware/    — auth middleware, user context
├── services/
│   └── api.js         — fetch wrapper with credentials
└── components/
    └── icons/         — shared SVG icon components
```

Cart state is managed with `useReducer` and split across two contexts —
one for state and one for dispatch — to avoid unnecessary re-renders.

---
## Backend
### Backend Overview
The backend is a Spring application built with Maven and packaged into a Docker image using a multi-stage build.
The final container runs a compiled JAR on a minimal Java runtime.
The application is configured via environment variables and communicates with DynamoDB.

The backend is organized into feature packages mirroring the frontend structure:

```
ge.beauty_code.backend/
├── auth/      — authentication, remember-me, user details
├── user/      — user controller, service, repository, DTOs
├── product/   — product controller, service, repository, DTOs
├── order/     — order controller, service, repository, DTOs
└── config/    — web security, CORS, AWS
```

### Security
Authentication is handled by Spring Security with session-based login and remember-me support.

**Session-based auth** — On successful login, Spring creates an HTTP session and returns a
`JSESSIONID` cookie. Every subsequent request is authenticated via that cookie — no JWT involved.

**CSRF** — SPA mode is enabled. Spring Security issues a `XSRF-TOKEN` cookie that the
frontend reads and sends back as `X-XSRF-TOKEN` on mutating requests (`POST`, `PUT`, `DELETE`).
This prevents cross-site request forgery while still working with a decoupled frontend.

**CORS** — Configured explicitly to allow requests only from `localhost:5173` (dev) and
`beauty-code.ge` (production). `allowCredentials(true)` is required so the browser includes
the `JSESSIONID` cookie on cross-origin requests — without it, every request would arrive unauthenticated.

**Remember-me** — When the user logs in with `remember-me=true`, Spring generates a persistent
token stored in DynamoDB (`RememberMeTokens` table). On return visits, Spring validates the token
and re-authenticates without a password. Token expires after 6 hours.

**Password storage** — BCrypt hashing happens inside `UserRepository` at write time, before
the value is persisted to DynamoDB. The plain-text password is never stored.

**Authorization rules** — Any endpoint not explicitly listed is denied by default via `.anyRequest().denyAll()`,
meaning new endpoints are blocked unless access is explicitly granted.

| Path | Access |
| ---- | ------ |
| `POST /api/login` | Public |
| `GET /api/products/**` | Public |
| `GET /api/me` | Authenticated |
| `GET /api/users/**` | Authenticated |
| `GET /api/orders/**` | Authenticated |
| anything else | Denied |

**API versioning** — Endpoints are versioned via the `API-Version` request header.

---
## Database
### DynamoDB Access
A dedicated IAM user (`bc-ddb-dev`) is used for development access.
Permissions are scoped to a single table and its indexes.
### Access Patterns
| Entity  | Access pattern            | Key / index need             |
| ------- | ------------------------- | ---------------------------- |
| Product | List all products         | Dedicated partition or index |
| Product | List products by category | GSI on category              |
| Product | Find the bestseller       | Precomputed item             |
| Product | All except bestseller     | App-level filtering          |
| User    | Find user by email        | GSI on email                 |
| User    | Update user email         | Depends on key design        |
| User    | Update user phone         | Primary key                  |
| Order   | Find orders by user       | Partition by user            |
| Order   | Sorted by date            | Sort key = date              |
---
## Infrastructure
### Docker Setup
The application runs using Docker Compose with two services:
- frontend (Nginx serving static build)
- backend (Spring application)

The frontend proxies API requests to the backend over an internal network.
### Reverse Proxy
Nginx serves the frontend and forwards `/api/` requests to the backend service.
### Nginx Performance
Nginx is configured to improve delivery and reduce unnecessary work:
- `sendfile on` enables efficient file transfer for static assets
- `tcp_nopush on` and `tcp_nodelay on` optimize packet delivery behavior
- `gzip on` compresses supported text-based responses
- `gzip_comp_level 5` keeps compression balanced between speed and size
- `gzip_min_length 1024` avoids compressing very small responses
- long cache headers are applied to `/assets/` and `/font/`
- static assets use `Cache-Control: public, immutable`
- asset access logs are disabled to reduce noise
- `server_tokens off` hides Nginx version details

For static frontend files, this improves load speed and caching efficiency. For API traffic, Nginx acts as a lightweight reverse proxy in front of the backend.
