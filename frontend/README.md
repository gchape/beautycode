# BeautyCode Frontend

## Overview

BeautyCode (beauty-code.ge) is an e-commerce storefront for beauty devices (IPL epilators, facial vacuum cleansers, hair styling tools). It's a client-side rendered React SPA built with Vite, React Router v8 (data-router mode), and Tailwind CSS v4.

- **Language/locale:** Georgian (`lang="ka"`), all UI copy is in Georgian.
- **Domain:** https://www.beauty-code.ge
- **Type:** Single-page app with SEO meta tags, client-side routing, and a lightweight cart.

---

## Tech Stack

| Concern       | Library / Tool                                                                      |
| ------------- | ----------------------------------------------------------------------------------- |
| Framework     | React 19                                                                            |
| Routing       | React Router v8 (`createBrowserRouter`, route modules, middleware, loaders/actions) |
| Build tool    | Vite 8 (rolldown-vite) with Babel + React Compiler plugin                           |
| Styling       | Tailwind CSS v4 (`@tailwindcss/vite`), CSS-based `@theme` design tokens             |
| HTTP client   | `ky` (thin fetch wrapper)                                                           |
| UI primitives | Radix UI (`Dialog`, `DropdownMenu`)                                                 |
| Icons         | `lucide-react`                                                                      |
| Class merging | `clsx` (aliased as `cn`)                                                            |
| Linting       | ESLint 9 flat config + `typescript-eslint`                                          |
| Live chat     | Crisp Chat (lazy-loaded after 3s)                                                   |
| Language      | TypeScript (strict mode)                                                            |

---

## Project Structure

The codebase loosely follows a **feature-sliced / entities-ui** pattern:

```
src/
├── app/                # App shell: router config, root layout, 3rd-party scripts
├── entities/           # Domain modules (api + types + hooks), no UI
│   ├── auth/
│   ├── cart/
│   ├── order/
│   ├── product/
│   └── user/
├── lib/                # Cross-cutting utilities (http client, cn helper, nav config)
├── routes/             # Route modules — one file per route (loader/action/Component)
├── ui/                 # Presentational components, grouped by feature area
│   ├── auth/
│   ├── cart/
│   ├── footer/
│   ├── home/
│   ├── icons/
│   ├── legal/
│   ├── navbar/
│   ├── product/
│   ├── profile/
│   └── shared/
├── assets/             # Static images
├── index.css           # Tailwind import, @theme design tokens, base layer
├── main.tsx            # App entry point
└── vite-env.d.ts
```

**Path alias:** `src/*` maps to `./src/*` (configured in both `vite.config.js` and `tsconfig.app.json`), so imports use `src/entities/product` rather than relative paths.

---

## Routing

Routing uses **React Router v8's data router** with **route modules**: each route is lazy-loaded and exports its own `Component`, `loader`, `action`, `middleware`, and `HydrateFallback` as needed. `router.tsx` is the single source of truth for the URL tree.

### Route Tree

| Path                    | Module                | Notes                                                                 |
| ----------------------- | --------------------- | --------------------------------------------------------------------- |
| `/`                     | `routes/home.tsx`     | Loader fetches product list; has `HydrateFallback` skeleton           |
| `/products`             | `routes/products.tsx` | Supports `?category=` query param; has skeleton fallback              |
| `/cart`                 | `routes/cart.tsx`     | Reads from cart context, no loader (client-only state)                |
| `/profile`              | `routes/profile.tsx`  | Protected by `requireAuthMiddleware`; loads user + orders in parallel |
| `/terms-and-conditions` | `routes/terms.tsx`    | Static legal content                                                  |
| `/login`                | `routes/login.tsx`    | Top-level (outside `Root` layout), has `action` for auth              |
| `/register`             | `routes/register.tsx` | Top-level, has `action` for signup                                    |
| `/logout`               | `routes/logout.ts`    | Action-only route, clears token and redirects                         |
| `/subscribe`            | `routes/subscribe.ts` | Action-only, newsletter signup                                        |
| `*`                     | `NotFoundPage`        | Catch-all 404 within `Root` layout                                    |

All routes except `/login`, `/logout`, `/register`, `/subscribe` render inside `Root`, which wraps content with `SiteHeader`, `SiteFooter`, and `CrispChat`.

### Auth Middleware

`requireAuthMiddleware` (in `entities/auth/middleware.ts`) runs before a route's loader/action. It checks `tokenStorage.get()`; if absent, it throws a `redirect` to `/login?redirectTo=<original path>`. This is attached only to the `/profile` route currently.

### Redirect Safety

`login.tsx` guards against open-redirect attacks via `isSafeRedirect`, which only allows relative paths starting with a single `/`.

---

## State Management

### Cart

Two cart implementations exist in the codebase:

1. **`entities/cart/context.tsx`** — the one actually wired into `main.tsx`. Plain in-memory `useReducer`, no persistence.
2. **`ui/cart/context.tsx`** — an alternate/newer implementation that persists cart contents to `localStorage` (`cart_items` key) via `useEffect`, with safe JSON parsing fallback.

> **Note:** Only `entities/cart` is imported by `main.tsx`. The `ui/cart/context.tsx` file appears to be a persistence-enabled variant that isn't currently wired up — worth confirming which one is intended to be canonical.

Cart actions: `ADD`, `INCREASE`, `DECREASE` (floor of 1), `REMOVE`. Consumed via `useCart()` (state) and `useCartDispatch()` (dispatch), each requiring `CartProvider` in the tree.

### Auth Token

`tokenStorage` (in `lib/http.ts`) wraps `localStorage` under the key `auth_token`, with `get`/`set`/`clear`. The `ky` instance auto-attaches `Authorization: Bearer <token>` via a `beforeRequest` hook when present.

---

## Data Layer (Entities)

Each entity module exposes an `api.ts` (data fetching), `types.ts`, and a barrel `index.ts`. All requests funnel through the shared `ky` instance in `lib/http.ts`:

- Base URL: `import.meta.env.VITE_API_URL`
- Timeout: 10s
- Retry: 1 attempt, GET only
- Errors are normalized into `ApiError` (via `toApiError`), carrying an HTTP `status`

| Entity    | Methods                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------- |
| `auth`    | `login(email, password)`, `register(entries)`, `logout()`                                                           |
| `product` | `list(category?)` → `ProductCard[]` (home/hero), `summary(category?)` → `Product[]` (catalog, includes description) |
| `order`   | `list()` → `Order[]`                                                                                                |
| `user`    | `profile()` → `User`                                                                                                |

---

## Pages & Key Features

### Home (`/`)

- **Hero** (`HomeHero`): Highlights the product tagged `badge === "Premium"`, with an "add to cart" button that shows a temporary success state (checkmark, 1.2s).
- **Featured Collection**: One product per unique category (excluding Premium), rendered in a masonry-style CSS column layout.
- **Mission section**: Static brand story content.
- Loader blocks on `productApi.list()`; `HomeSkeleton` shown during hydration/loading.

### Products / Catalog (`/products`)

- `CategoryFilter`: Client-side category tabs backed by `?category=` search param (`all`, `epilator`, `facial-cleanser`, `hair-dryer`).
- `CatalogGrid`: 2/3-column grid of `ProductCard` (catalog variant), with alternating vertical offset for visual rhythm.
- Loader re-fetches `productApi.summary(category)` on category change.

### Cart (`/cart`)

- Line items with quantity stepper, remove button, and per-item totals.
- `OrderSummary`: subtotal, free shipping line, disabled "Checkout" button (tooltip: "checkout coming soon"), and a security/trust badge.
- Empty state with CTA back to `/products`.

### Profile (`/profile`) — **protected route**

- Parallel loader for `user.profile()` and `order.list()`.
- Displays avatar, order history (or empty state), and read-only account fields (first/last name, email, phone).
- Logout via a fetcher-submitted POST to `/logout`.

### Auth (`/login`, `/register`)

- Shared `AuthLayout` (split-screen image + testimonial on desktop, centered form on mobile).
- Both use `useFetcher` + route `action` for non-navigating form submission with inline error states.
- Register validates password confirmation client-side before calling the API; only forwards fields the backend's `RegisterRequest` expects (drops `confirmPassword`).
- Handles specific HTTP status codes: `401` (bad login), `409` (email already registered).

### Terms & Conditions (`/terms-and-conditions`)

- Static, fully Georgian legal content: merchant identity, statutory warranty, order acceptance, delivery pricing (free everywhere), 14-day unconditional return policy, force majeure. Structured with reusable `LegalSection`/`LegalListItem` helpers.

### Newsletter & Chat

- `FooterNewsletter`: fetcher-based subscribe form, posts to `/subscribe` action, shows a success message.
- `CrispChat`: injects the Crisp widget script 3 seconds after mount (deferred for performance), cleans up on unmount.

---

## Design System (Tailwind v4 `@theme`)

Defined entirely in `src/index.css` using Tailwind v4's CSS-first theming (no `tailwind.config.js`):

- **Fonts:** `Cormorant Garamond` (script/headline, serif, self-hosted `.woff2`), `DM Sans` (body), `DM Mono` (labels/uppercase tags).
- **Color palette:** A warm "taupe" neutral scale (50–900) and a "pink" accent scale (50–500), plus semantic tokens (`--color-primary`, `--color-accent`, `--color-error`, `--color-success`, etc.) that mimic a DaisyUI-style theme without using DaisyUI.
- **Utilities:** `.skeleton` (shimmer loading placeholder, used in `HomeSkeleton`, `ProductsSkeleton`, `ProfileSkeleton`), `.no-scrollbar`.
- Global base-layer resets: box-sizing, font smoothing, thin custom scrollbars, pointer cursor on enabled buttons.

---

## Notable Implementation Patterns

- **Route modules + lazy loading**: keeps `router.tsx` declarative while code-splitting each page automatically.
- **Fetcher-based mutations**: Login, register, logout, and newsletter subscribe all use `useFetcher`/`Form` + route `action` instead of manual `fetch` + `useState`, giving built-in pending states without full navigation.
- **HydrateFallback skeletons**: Home, Products, and Profile each define a matching skeleton shown during data loading, avoiding layout shift.
- **Optimistic UI micro-interactions**: Add-to-cart buttons on both `HomeHero` and `ProductCard` flip to a checkmark/"added" state for ~1.2s using a cleared `setTimeout` ref.
- **Error normalization**: All API calls wrap `ky` calls in try/catch and funnel errors through `toApiError`, so downstream code can check `error.status` uniformly.
- **Accessibility touches**: `aria-live` on quantity counters, `aria-label`s on icon-only buttons, `aria-busy`/`aria-label` on skeleton containers, disabled-state `aria-disabled` handling on links during submission.

---

## Known Issues / Things to Verify

1. **Duplicate cart implementations** — `entities/cart/context.tsx` (in use, no persistence) vs `ui/cart/context.tsx` (localStorage-persisted, unused). Decide which is canonical and remove the other.
2. **Disabled checkout** — `OrderSummary`'s checkout button is permanently disabled with a "coming soon" tooltip; payment integration appears unimplemented.
3. **Email inconsistency** — Footer/contact links use `13beauty.code@gmail.com`, but the Terms page uses `13beautycode@gmail.com` (no dot). Worth reconciling.
4. **`requireAuthMiddleware`** is only applied to `/profile`; if `/cart` or others are meant to require login, they'd need the same middleware.
5. **Environment variables required:** `VITE_API_URL` (backend base URL) and `VITE_CRISP_WEBSITE_ID` (Crisp chat) must be set for the app to function correctly.

---

## Environment Variables

| Variable                | Used in             | Purpose                            |
| ----------------------- | ------------------- | ---------------------------------- |
| `VITE_API_URL`          | `lib/http.ts`       | Base URL for all `ky` API requests |
| `VITE_CRISP_WEBSITE_ID` | `app/CrispChat.tsx` | Crisp live-chat website identifier |

---

## Scripts

| Command           | Purpose                                     |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start Vite dev server                       |
| `npm run build`   | Type-check (`tsc -b`) then production build |
| `npm run lint`    | Run ESLint over the project                 |
| `npm run preview` | Preview the production build locally        |
