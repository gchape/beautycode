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

- [DynamoDB Design Philosophy](#dynamodb-design-philosophy)
- [Table Design](#table-design)
- [Access Patterns](#access-patterns)
- [GSI Design](#gsi-design)

### Diagrams

- [DynamoDB Schema](#dynamodb-schema-diagram)
- [Security Flow](#security-flow-diagram)
- [System Architecture](#system-architecture-diagram)

### Infrastructure

- [Docker Setup](#docker-setup)
- [Reverse Proxy](#reverse-proxy)
- [Nginx Performance](#nginx-performance)

---

## Frontend

### Lighthouse Scores

| Performance | Accessibility | Best Practices | SEO |
| ----------- | ------------- | -------------- | --- |
| 100         | 90            | 100            | 100 |

### Performance Optimizations

**Fonts hosted locally** — Google Fonts were removed as a render-blocking external dependency.
Cormorant Garamond, DM Sans, and DM Mono are now served as `.woff2` files from `/font/`,
with `font-display: swap` to prevent invisible text during load. Only the weights actually
used in the UI are included (regular, semibold) — unused weights were dropped entirely.

**Crisp chat deferred** — the Crisp live chat script is loaded with a 3-second delay after
page interaction, keeping it off the critical path. The initial render is unaffected;
the widget appears silently in the background once the user is engaged with the page.

**Skeleton loading states** — `Hero`, `FeaturedProducts`, `ProductCatalogGrid`, and `Profile`
all render layout-matched skeletons while data loads, eliminating layout shift and replacing
the previous `null` / `"Loading..."` placeholders.

**Icon components** — Material Symbols (Google Fonts) were removed. All icons are inline SVG
components, contributing zero extra network requests.

### Asset Handling

Static assets are split across two Nginx-served locations:

- `/assets/` — Vite build output with content-hashed filenames, cached for 1 year
- `/font/` — self-hosted woff2 font files, cached for 1 year

Both locations use `Cache-Control: public, immutable` and have access logging disabled.

Product images are proxied from S3 via the `/images/` Nginx location with a 1-year
immutable cache header. The proxy forces `Content-Type: image/webp` and sets
`Cross-Origin-Resource-Policy: cross-origin` to allow cross-origin image loads.

### SEO Improvements

- Open Graph tags for social sharing previews
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
│   ├── profile/       — profile page, loader, fallback skeleton
│   ├── navbar/
│   ├── footer/
│   ├── home/
│   └── chat/          — Crisp live chat (deferred 3s)
├── hooks/
│   ├── useProducts.js — react-query product fetching with category support
│   ├── useOrders.js   — react-query order fetching
│   └── useFormFetcher.js — react-router fetcher wrapper
├── services/
│   └── api.js         — fetch wrapper with credentials
└── components/
    ├── icons/         — shared inline SVG icon components
    └── ErrorPage.jsx  — root error boundary fallback
```

Cart state is managed with `useReducer` and split across two contexts —
one for state and one for dispatch — to avoid unnecessary re-renders.

`CategoryProvider` is scoped to the `/products` route only, not global, so category
state is created and destroyed with the route.

Components that are tightly coupled to a single feature (e.g. `ProfileAccountField`,
`ProfileOrderCard`) live inside that feature's `components/` folder rather than the
global `components/` directory.

Data fetching uses `@tanstack/react-query` with skeleton loading states for `Hero`,
`FeaturedProducts`, `ProductCatalogGrid`, and `ProfileOrders`.
Products are cached for 5 minutes, orders for 2 minutes.

---

## Backend

### Backend Overview

The backend is a Spring application built with Maven and packaged into a Docker image
using a multi-stage build. The final container runs a compiled JAR on a minimal Java runtime.
The application is configured via environment variables and communicates with DynamoDB.

```
ge.beauty_code.backend/
├── authentication/    — form login, remember-me, user details, DefaultUserDetails
├── admin/             — admin repository and credentials
├── user/              — user controller, service, repository, DTOs, model
├── product/           — product controller, service, repository, DTOs, model, converters
├── order/             — order controller, service, repository, DTOs, model
└── config/            — web security, AWS, WebMvcConfigurer
```

Each feature owns its models under a local `model/` subpackage rather than a shared global
`model/` package. This keeps each feature self-contained and avoids cross-feature coupling.

### Security

Authentication is handled by Spring Security with form-based login, session persistence,
and remember-me support backed by DynamoDB.

**Form login** — Spring's `UsernamePasswordAuthenticationFilter` processes `POST /api/login`
with `email` and `password` form parameters. On success it automatically persists the security
context to the HTTP session and returns 200. On failure it returns 401. No manual
`AuthenticationController` is needed.

**Session-based auth** — Spring creates an HTTP session and returns a `JSESSIONID` cookie on
login. Every subsequent request is authenticated via that cookie. No JWT involved.

**Remember-me** — When the user logs in with `remember-me=on`, Spring generates a persistent
token stored in DynamoDB (`RememberMeTokens` table) and sets a `remember-me` cookie. On return
visits after session expiry, `PersistentTokenBasedRememberMeServices` validates the token and
re-authenticates without a password. Token expires after 6 hours via DynamoDB TTL on `ExpiresAt`.

**CSRF** — Disabled. The frontend is served from the same origin via the Nginx reverse proxy,
so all API requests are same-origin from the browser's perspective.

**CORS** — Configured to allow `http://localhost:5173` (Vite dev server) and
`https://beauty-code.ge` (production). In production, Nginx proxies all requests through the
same origin so CORS is not needed — the config exists for local development only.

**Unauthenticated requests** — Spring's default behaviour redirects 401s to its own `/login`
page, which causes a CORS error in the browser as the redirect points directly to the backend.
This is overridden with a custom `authenticationEntryPoint` that returns a plain 401 instead,
letting the React router handle the redirect on the client side.

**Password storage** — BCrypt hashing happens inside `UserRepository` at write time.
The plain-text password is never stored.

**Authorization** — `DelegatingUserDetailsService` checks `UserRepository` first; if the
email is not found it falls through to `AdminRepository`. This avoids exception-based flow
control and makes the lookup path explicit.

Role and authority assignments are centralised in the `DefaultUserDetails` enum:

| Authority        | USER | ADMIN |
| ---------------- | ---- | ----- |
| `PRODUCT_READ`   | ✅   | ✅    |
| `PRODUCT_WRITE`  | ❌   | ✅    |
| `PRODUCT_UPDATE` | ❌   | ✅    |
| `PRODUCT_DELETE` | ❌   | ✅    |
| `ORDER_READ`     | ✅   | ✅    |
| `ORDER_WRITE`    | ✅   | ✅    |
| `USER_READ`      | ✅   | ✅    |
| `USER_DELETE`    | ❌   | ✅    |

Any endpoint not explicitly listed is denied by default via `.anyRequest().denyAll()`.

| Path                  | Method | Access        |
| --------------------- | ------ | ------------- |
| `/api/login`          | POST   | Public        |
| `/api/users/register` | POST   | Public        |
| `/api/products/**`    | GET    | Public        |
| `/api/users/**`       | GET    | Authenticated |
| `/api/users/orders`   | POST   | Authenticated |
| anything else         | any    | Denied        |

**Category conversion** — `CategoryConverter` is annotated with `@Component` and registered
automatically by Spring Boot. It converts `String` request parameters (e.g. `epilator`,
`hair-dryer`) to the `Category` enum, handling case normalization and hyphen-to-underscore
replacement.

---

## Database

### DynamoDB Design Philosophy

DynamoDB is a key-value and document store that requires access patterns to be known upfront.
Unlike relational databases, there are no joins — relationships are modelled through careful
key design and secondary indexes.

The core principle is: **optimise for reads, pay the cost at write time.**

Two tables are used:

- `BeautyCode` — single-table design for all application entities (User, Order, Product, Admin)
- `RememberMeTokens` — separate table for remember-me tokens, kept isolated because it has
  a completely different access pattern, lifecycle (TTL-based expiry), and no relationship to
  the main entity model

### Table Design

#### BeautyCode (main table)

All entities share a single table with `PK` (partition key) and `SK` (sort key), both `String`.
Each entity type uses a prefixed key pattern to avoid collisions and enable prefix-based queries.

| Entity  | PK              | SK              |
| ------- | --------------- | --------------- |
| User    | `USER#{email}`  | `USER#{email}`  |
| Admin   | `ADMIN#{email}` | `ADMIN#{email}` |
| Order   | `USER#{email}`  | `ORDER#{id}`    |
| Product | `PRODUCT#{id}`  | `PRODUCT#{id}`  |

Orders use the user's email as their PK so all orders for a user live in the same partition,
enabling efficient range queries with an `ORDER#` SK prefix — no index needed.

Products and Users use the same value for PK and SK, allowing direct O(1) lookups by ID or email.

A `Type` attribute (`"User"`, `"Product"`, `"Order"`) is written on each item to support
GSI-based queries that need to filter by entity type. All attribute names follow PascalCase.

#### RememberMeTokens

A separate table with `Series` as the sole partition key (no sort key — each series is globally unique).

| Attribute    | Type        | Purpose                          |
| ------------ | ----------- | -------------------------------- |
| `Series`     | String (PK) | Unique token identifier          |
| `Email`      | String      | Links token to a user            |
| `TokenValue` | String      | Rotating token value             |
| `LastUsed`   | String      | ISO-8601 timestamp               |
| `ExpiresAt`  | Number      | Unix epoch — drives DynamoDB TTL |

TTL is declared in Terraform via the `ttl` block pointing at `ExpiresAt`. The only explicit
deletion needed is on logout — a simple sequential loop since a user holds at most a few tokens.

### Access Patterns

| Entity  | Access pattern       | How it's solved                                             |
| ------- | -------------------- | ----------------------------------------------------------- |
| Product | Find by ID           | Direct `GetItem` on `PK = PRODUCT#{id}`                     |
| Product | List all products    | GSI query on `Type = "Product"` via `ProductsByType`        |
| Product | List by category     | GSI query on `Category` via `ProductsByCategory`            |
| User    | Find by email        | Direct `GetItem` on `PK = USER#{email}`                     |
| User    | Check existence      | Direct `GetItem` with `PK` projection only                  |
| User    | Load credentials     | Direct `GetItem` with projection on `Email`, `Password`     |
| Order   | Find orders by user  | `Query` on `PK = USER#{email}` with `SK begins_with ORDER#` |
| Admin   | Load credentials     | Direct `GetItem` on `PK = ADMIN#{email}`                    |
| Token   | Find by series       | Direct `GetItem` on `PK = Series`                           |
| Token   | Find tokens by email | GSI query on `Email` via `TokensByEmail`                    |

### GSI Design

**Why semantic GSI names over generic `GSI1`/`GSI2`?**

The `GSI1PK`/`GSI2PK` overloading pattern is designed for single-table designs where multiple
entity types share the same index. In this application, `ProductsByType` and `ProductsByCategory`
are only ever queried for products — no cross-entity sharing. Semantic names make the intent
immediately clear with no indirection.

**GSI summary**

| Index                | Table            | Hash key   | Projection | Purpose                       |
| -------------------- | ---------------- | ---------- | ---------- | ----------------------------- |
| `ProductsByType`     | BeautyCode       | `Type`     | ALL        | List all products             |
| `ProductsByCategory` | BeautyCode       | `Category` | ALL        | Filter products by category   |
| `TokensByEmail`      | RememberMeTokens | `Email`    | KEYS_ONLY  | Find tokens by user on logout |

`TokensByEmail` uses `KEYS_ONLY` because logout only needs `Series` to perform deletes —
there is no need to project full token data into the index.

---

## Diagrams

### DynamoDB Schema Diagram

### Security Flow Diagram

### System Architecture Diagram

---

## Infrastructure

### Docker Setup

The application runs using Docker Compose with two services:

- `frontend` — Nginx serving the Vite static build
- `backend` — Spring Boot application

The frontend proxies API requests to the backend over an internal Docker network.
`backend` resolves as a hostname within the Docker network — `localhost` inside the Nginx
container refers to the Nginx container itself, not the Spring Boot service.

For local development, the Vite dev server proxies `/api/` to `localhost:8080` directly —
Nginx is not involved. This mirrors the production proxy setup so Spring Security behaves
identically in both environments.

### Reverse Proxy

Nginx serves the React SPA and forwards all `/api/` requests to the backend service.

| Location   | Behaviour                                                |
| ---------- | -------------------------------------------------------- |
| `/`        | SPA fallback — serves `index.html` for unknown routes    |
| `/api/`    | Proxy to `backend:8080`                                  |
| `/images/` | Proxy to S3, forces `image/webp`, 1-year cache           |
| `/assets/` | Static files, 1-year immutable cache, no access log      |
| `/font/`   | Self-hosted fonts, 1-year immutable cache, no access log |

### Nginx Performance

- `sendfile on` — efficient kernel-level file transfer for static assets
- `tcp_nopush on` — batches response headers and first data chunk
- `gzip on` at level 5 — compresses text, CSS, JSON, JS, SVG responses over 1 KB
- `gzip_vary on` — correct `Vary: Accept-Encoding` header for CDN compatibility
- `server_tokens off` — hides Nginx version from response headers
- 1-year `Cache-Control: public, immutable` on `/assets/` and `/font/`
- Access logging disabled on static asset locations to reduce noise
