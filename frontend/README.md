# frontend

React 19 / Vite / TypeScript storefront for BeautyCode. Georgian-language e-commerce UI: product catalog, cart, auth (LDAP-backed via the backend), order history, newsletter signup.

## Stack

- **Vite 8** + `@vitejs/plugin-react` + `babel-plugin-react-compiler` (React Compiler auto-memoizes — no manual `useMemo`/`useCallback` needed in most cases)
- **React Router v8** — route modules under `src/routes/`, each exporting its own `Component` / `loader` / `action` / `HydrateFallback`, wired centrally in `src/app/router.tsx`
- **Tailwind CSS v4** — config lives in `src/index.css` via `@theme` (no `tailwind.config.js`); custom taupe/pink palette, `DM Sans`/`Cormorant Garamond`/`DM Mono` self-hosted fonts
- **ky** — HTTP client wrapping `fetch`, auto-attaches the JWT `Authorization` header
- **Radix UI** — `Dialog` for the mobile nav drawer
- **lucide-react** — icons
- **Crisp** — chat widget, lazy-loaded 3s after mount

## Project layout

```
src/
├── app/            # router, root layout, Crisp widget
├── entities/       # domain modules: auth, cart, order, product, user
│   └── {entity}/   #   api.ts, types.ts, index.ts (barrel), context.tsx where stateful
├── lib/            # http client, cn() helper, nav config
├── routes/         # one file per route — Component/loader/action/HydrateFallback
└── ui/             # presentational components, grouped by feature (cart/, navbar/, product/, ...)
```

**Pattern**: routes stay thin (data fetching + composition), `entities/` owns API calls and types per domain, `ui/` is pure presentation. Route modules are lazy-loaded (`lazy: () => import(...)`) except `/login`, `/logout`, `/register`, `/subscribe`, which are eager since they're small and typically hit early.

## Auth

`src/entities/auth/`:

- `authApi.login` — POST `/login`, stores the JWT in `localStorage` (`tokenStorage`)
- `requireAuthMiddleware` — React Router v8 middleware, redirects to `/login?redirectTo=...` if no token; attached per-route (currently just `/profile`) instead of duplicated in every loader
- `ky`'s `beforeRequest` hook attaches `Authorization: Bearer <token>` automatically on every request once a token exists

No refresh-token flow — a token just expires (`spring.security.jwt.expiration-seconds` server-side, see `backend/README.md`) and the next authenticated request gets a 401, which loaders don't currently intercept to force a re-login (see Known gaps).

## Cart

`src/entities/cart/context.tsx` — reducer-based (`ADD`/`INCREASE`/`DECREASE`/`REMOVE`), persisted to `localStorage` (`cart_items`) with a `try/catch` around both read and write so a corrupted or inaccessible storage doesn't crash the app, just silently starts empty / stops persisting.

**Note**: `src/entities/cart/context.tsx` and `src/ui/cart/context.tsx` are two near-duplicate implementations — the `ui/cart` one adds `localStorage` persistence, the `entities/cart` one doesn't. `main.tsx` imports from `src/entities/cart`. Confirm `src/ui/cart/context.tsx` isn't dead code before your next cleanup pass — if nothing imports it, delete it; if something does, that's a second cart state living alongside the real one.

## Environment variables

Two required, both `VITE_`-prefixed (build-time, inlined by Vite — not available for runtime rotation):

```
VITE_API_URL=https://api.beautycode.live
VITE_CRISP_WEBSITE_ID=...
```

These come from Terraform outputs (`infra/`) — see `frontend/scripts/deploy-frontend.sh`, which pulls both via `terraform output` and writes `.env` before `npm run build`. Locally, create `.env` by hand for `npm run dev` (e.g. `VITE_API_URL=http://localhost:8080`).

## Scripts

```bash
npm run dev       # vite dev server
npm run build     # tsc -b (type-check via project references) && vite build
npm run lint       # eslint .
npm run preview    # preview the production build locally
```

## Deploying

Not built/served by this repo directly — static output goes to S3 behind CloudFront. See `scripts/deploy-frontend.sh` and `infra/README.md` for the full path (build → `aws s3 sync` → CloudFront invalidation). Triggered automatically by `.github/workflows/deploy-frontend.yml` on push to `main` under `frontend/**`.

## Known gaps / things to revisit

- **No 401 interception** — `entities/*/api.ts` all wrap `ky` calls in `toApiError`, but nothing globally detects an expired/invalid token and redirects to `/login`. A user with a stale token sees whatever error message the calling route decides to show, not a forced re-auth.
- **Duplicate cart context** (`src/entities/cart/context.tsx` vs `src/ui/cart/context.tsx`) — see above.
- **Checkout is stubbed** — `OrderSummary`'s pay button is `disabled` with a "coming soon" tooltip; `OrderController`/`OrderService` on the backend already supports creating orders, so the missing piece is wiring an actual payment step (mentioned as "პარტნიორი ბანკები" in the UI copy) before this button can go live.
- **`index.html` canonical/OG URLs point at `beauty-code.ge`**, while the backend's CORS allowlist and the infra's ACM cert are provisioned for `beautycode.live` — worth confirming which domain is canonical before launch, since a mismatch here affects SEO and social previews, not runtime behavior.
