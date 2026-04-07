# BeautyCode

## Table of Contents

### Frontend

- [Lighthouse Scores](#lighthouse-scores)
- [Performance Optimizations](#performance-optimizations)
- [Asset Handling](#asset-handling)
- [SEO Improvements](#seo-improvements)

### Backend

- [Backend Overview](#backend-overview)

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

---

## Backend

### Backend Overview

The backend is a Spring application built with Maven and packaged into a Docker image using a multi-stage build.
The final container runs a compiled JAR on a minimal Java runtime.

The application is configured via environment variables and communicates with DynamoDB.

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
