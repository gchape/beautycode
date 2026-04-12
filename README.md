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
│   └── chat/          — Crisp live chat integration
├── hooks/
│   ├── useProducts.js — react-query product fetching with category support
│   ├── useOrders.js   — react-query order fetching
│   └── useFormFetcher.js — react-router fetcher wrapper
├── services/
│   └── api.js         — fetch wrapper with credentials
└── components/
    ├── icons/         — shared SVG icon components
    └── ErrorPage.jsx  — global error boundary fallback
```

Cart state is managed with `useReducer` and split across two contexts —
one for state and one for dispatch — to avoid unnecessary re-renders.

`CategoryProvider` is scoped to the `/products` route only, not global, so category
state is created and destroyed with the route.

Components that are tightly coupled to a single feature (e.g. `ProfileAccountField`, `ProfileOrderCard`)
live inside that feature's `components/` folder rather than the global `components/` directory.

Data fetching uses `@tanstack/react-query` with skeleton loading states for `Hero`,
`FeaturedProducts`, and `ProfileOrders`. Products are cached for 5 minutes, orders for 2 minutes.

---

## Backend

### Backend Overview

The backend is a Spring application built with Maven and packaged into a Docker image using a multi-stage build.
The final container runs a compiled JAR on a minimal Java runtime.
The application is configured via environment variables and communicates with DynamoDB.

The backend is organized into feature packages mirroring the frontend structure:

```
ge.beauty_code.backend/
├── authentication/    — login, remember-me, user details, DefaultUserDetails
├── admin/             — admin repository and credentials
├── user/              — user controller, service, repository, DTOs, model
├── product/           — product controller, service, repository, DTOs, model, converters
├── order/             — order controller, service, repository, DTOs, model
└── config/            — web security, CORS, AWS, WebMvcConfigurer
```

Each feature owns its models under a local `model/` subpackage rather than a shared global
`model/` package. This keeps each feature self-contained and avoids cross-feature coupling.

### Security

Authentication is handled by Spring Security with session-based login and remember-me support.

**Session-based auth** — On successful login, Spring creates an HTTP session and returns a
`JSESSIONID` cookie. Every subsequent request is authenticated via that cookie — no JWT involved.
The session is explicitly saved to `HttpSession` in `AuthenticationController` to ensure it
is persisted correctly before the response is sent.

**CSRF** — Disabled. The frontend is served from the same origin via the Nginx reverse proxy,
so all API requests are same-origin from the browser's perspective. Cross-site request forgery
is not a realistic threat in this configuration.

**CORS** — Configured explicitly to allow requests only from `http://localhost` (dev) and
`https://beauty-code.ge` (production). `allowCredentials(true)` is required so the browser includes
the `JSESSIONID` cookie on cross-origin requests — without it, every request would arrive unauthenticated.

**Remember-me** — When the user logs in with `remember-me=true`, Spring generates a persistent
token stored in DynamoDB (`RememberMeTokens` table). On return visits, Spring validates the token
and re-authenticates without a password. Token expires after 6 hours. TTL is handled natively
by DynamoDB via the `ExpiresAt` attribute — explicit deletion on logout is a simple sequential
loop since a user realistically holds only a handful of tokens at any time.

**Password storage** — BCrypt hashing happens inside `UserRepository` at write time, before
the value is persisted to DynamoDB. The plain-text password is never stored.

**Authorization** — `DelegatingUserDetailsService` first checks if the email belongs to a
regular user via `UserRepository.contains()`. If the user exists, credentials are loaded from
`UserRepository`. Otherwise it falls through to `AdminRepository`. This avoids exception-based
flow control and makes the lookup path explicit.

Role and authority assignments are centralised in the `DefaultUserDetails` enum. Each variant
builds a `UserDetails` object with the appropriate authorities:

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

**Authorization rules** — Any endpoint not explicitly listed is denied by default via `.anyRequest().denyAll()`,
meaning new endpoints are blocked unless access is explicitly granted.

| Path                  | Method | Access        |
| --------------------- | ------ | ------------- |
| `/api/login`          | POST   | Public        |
| `/api/users/register` | POST   | Public        |
| `/api/products/**`    | GET    | Public        |
| `/api/users/**`       | GET    | Authenticated |
| `/api/users/orders`   | POST   | Authenticated |
| anything else         | any    | Denied        |

**Category conversion** — `CategoryConverter` is registered via `WebConfig` and converts
`String` request parameters (e.g. `epilator`, `hair-dryer`) to the `Category` enum automatically,
handling case normalization and hyphen-to-underscore replacement.

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

All entities share a single table with `PK` (partition key) and `SK` (sort key), both of type `String`.
Each entity type uses a prefixed key pattern to avoid collisions and enable prefix-based queries.

| Entity  | PK              | SK              |
| ------- | --------------- | --------------- |
| User    | `USER#{email}`  | `USER#{email}`  |
| Admin   | `ADMIN#{email}` | `ADMIN#{email}` |
| Order   | `USER#{email}`  | `ORDER#{id}`    |
| Product | `PRODUCT#{id}`  | `PRODUCT#{id}`  |

Orders use the user's email as their PK so all orders for a user live in the same partition,
enabling efficient range queries with an `ORDER#` SK prefix — no index needed.

Products and Users use the same value for PK and SK, which allows direct O(1) lookups by ID or email.

A `Type` attribute (`"User"`, `"Product"`, `"Order"`) is written on each item to support
GSI-based queries that need to filter by entity type.

All attribute names follow **PascalCase** consistently across all tables and Java code.

#### RememberMeTokens

A separate table with `Series` as the sole partition key (no sort key needed — each series is globally unique).

| Attribute    | Type        | Purpose                          |
| ------------ | ----------- | -------------------------------- |
| `Series`     | String (PK) | Unique token identifier          |
| `Email`      | String      | Links token to a user            |
| `TokenValue` | String      | Rotating token value             |
| `LastUsed`   | String      | ISO-8601 timestamp               |
| `ExpiresAt`  | Number      | Unix epoch — drives DynamoDB TTL |

TTL is declared in Terraform via the `ttl` block pointing at `ExpiresAt`. DynamoDB automatically
deletes expired tokens, so the only explicit deletion needed is on logout, which is a simple
sequential delete loop since a user holds at most a few tokens at any time.

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

The `GSI1PK`/`GSI2PK` overloading pattern from Alex DeBrie's book is designed for single-table
designs where multiple entity types share the same index — a single GSI serves different entities
by writing different values into the same generic attribute. This amortises write costs and
reduces the total number of indexes.

In this application, `ProductsByType` is only ever queried for products, and `ProductsByCategory`
is only ever queried for products. There is no cross-entity sharing. Using generic names like
`GSI1` would add indirection with no benefit. Semantic names make the intent immediately clear.

**Why not the Starbucks/hierarchical pattern (write duplication)?**

An alternative would be writing products into two items — one at `PRODUCT#{id}` for direct
lookup, and one at `CATEGORY#{name} / PRODUCT#{id}` for category queries — eliminating the
`ProductsByCategory` GSI entirely. This pattern trades write cost for read efficiency and is
useful at very high query volume. At the current scale the GSI approach is simpler: one write,
one index, no transaction required.

**GSI summary**

| Index                | Table            | Hash key   | Projection | Purpose                       |
| -------------------- | ---------------- | ---------- | ---------- | ----------------------------- |
| `ProductsByType`     | BeautyCode       | `Type`     | ALL        | List all products             |
| `ProductsByCategory` | BeautyCode       | `Category` | ALL        | Filter products by category   |
| `TokensByEmail`      | RememberMeTokens | `Email`    | KEYS_ONLY  | Find tokens by user on logout |

`TokensByEmail` uses `KEYS_ONLY` because logout only needs `Series` to perform deletes —
there is no need to project full token data into the index.

---

## Infrastructure

### Docker Setup

The application runs using Docker Compose with two services:

- frontend (Nginx serving static build)
- backend (Spring application)

The frontend proxies API requests to the backend over an internal Docker network.

### Reverse Proxy

Nginx serves the React SPA and forwards all `/api/**` requests to the backend service.
The `X-API-Version` header is forwarded via `proxy_set_header` so versioned endpoints
receive it correctly.

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

For static frontend files, this improves load speed and caching efficiency. For API traffic,
Nginx acts as a lightweight reverse proxy in front of the backend.

---

## Diagrams

### DynamoDB Schema Diagram

![dynamodb_schema](https://github.com/user-attachments/assets/3d8a6e26-1746-446a-9bdf-06b332245d59)

### Security Flow Diagram

![security_flow](https://github.com/user-attachments/assets/78bbaaa1-1084-45fc-9bfd-0907cc9ad4b3)

### System Architecture Diagram

![system_architecture](https://github.com/user-attachments/assets/338b504c-d218-470d-b665-85f729b1c5d4)
