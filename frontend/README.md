# BeautyCode Frontend

React + TypeScript SPA for BeautyCode — product catalog, cart, auth (login/
register), and a profile page, talking to the Spring Boot backend over a
thin `fetch` wrapper. Built with Vite, styled with Tailwind + daisyUI, data
fetching via TanStack Query, routing via React Router's data APIs
(loaders/actions/fetchers).

## Tech stack

- **React** + **TypeScript**, built with **Vite**
- **React Router** (`createBrowserRouter`) — routes, loaders, actions, and
  `fetcher.Form` for non-navigating form submissions
- **TanStack Query** — server-state fetching/caching for products and orders
- **Tailwind CSS** + **daisyUI** classes (`btn`, `badge`, `skeleton`,
  `fieldset`, etc.) for styling
- **class-variance-authority (cva)** + **clsx** / **tailwind-merge** (`cn`
  helper) — variant-driven component styling
- **lucide-react** — icons
- **Crisp** — live chat widget, lazy-loaded 3s after mount

## Project structure

```
src/
├── components/          # Small shared UI: ErrorPage, SectionTitle
├── constants/            # Nav links, category list
├── features/
│   ├── auth/              # Login, Register, actions, shared form pieces
│   ├── cart/               # Cart context/reducer + UI
│   ├── chat/                # CrispChat widget
│   ├── footer/               # Footer + newsletter signup
│   ├── home/                   # Home shell, Hero, BrandEthos
│   ├── legal/                    # Terms and conditions page
│   ├── navbar/                     # Navbar, burger menu, cart button
│   ├── product/                     # Catalog grid, categories, ProductCard
│   └── profile/                      # Profile page, orders, account fields
├── hooks/                # useProducts, useOrders, useFormFetcher
├── lib/                   # cn() (clsx + tailwind-merge)
├── services/               # api.ts — fetch wrapper + token storage
├── types.ts                 # Shared domain types
└── main.tsx                   # Router + providers root
```

Each feature folder exports its public surface through an `index.ts`
barrel — `src/features/auth`, `src/features/cart`, etc. — so the rest of
the app imports from the feature root rather than reaching into internals.

## Routing

Defined in `main.tsx` via `createBrowserRouter`:

| Path                    | Element                                       | Loader/Action                                               |
| ----------------------- | --------------------------------------------- | ----------------------------------------------------------- |
| `/`                     | Home layout (Navbar + Outlet + Footer)        | —                                                           |
| `/` (index)             | Hero + FeaturedProducts + BrandEthos          | —                                                           |
| `/products`             | ProductsCatalog (wrapped in CategoryProvider) | —                                                           |
| `/cart`                 | Cart                                          | —                                                           |
| `/profile`              | Profile                                       | `profileLoader`, with `ProfileFallback` as hydrate fallback |
| `/terms-and-conditions` | TermsAndConditions                            | —                                                           |
| `/login`                | Login                                         | `loginAction`                                               |
| `/register`             | Register                                      | `registerAction`                                            |
| `/logout`               | — (action only)                               | `logoutAction`                                              |

`ErrorPage` is set as the top-level `errorElement`, so any thrown error or
loader rejection under `/` renders it instead of crashing the tree.

## Auth flow

- **Login** (`loginAction`): submits `email`/`password` as form data to
  `POST /login`. On success, stores the returned JWT via `tokenStorage.set`
  (in `localStorage`, key `auth_token`) and redirects to `/`. On 401,
  returns a Georgian-language error string that `AuthError` renders inline.
- **Register** (`registerAction`): posts form entries to
  `POST /users/register`; on 409 shows "email already in use", on success
  redirects to `/login`.
- **Logout** (`logoutAction`): clears the token and redirects to `/login`.
- **Profile** (`profileLoader`): calls `GET /users/profile`; if the
  response isn't `ok` (e.g. no/expired token), throws a `redirect("/login")`
  from inside the loader — React Router treats that as a real redirect.
- Every outgoing request goes through `src/services/api.ts`, which reads
  the stored token and attaches `Authorization: Bearer <token>`
  automatically when present — callers never set that header manually.

## Data fetching

- `useProducts(category)` — TanStack Query hook, `GET /products` or
  `GET /products?category=<value>`, 5-minute `staleTime`.
- `useOrders(isAuthenticated)` — `GET /users/orders`, 2-minute `staleTime`,
  toggleable via the `enabled` option.
- `useFormFetcher<T>()` — thin wrapper around `useFetcher` exposing
  `{ fetcher, isLoading, data }`, used by every form (`Login`, `Register`,
  `FooterBrand`'s newsletter form, `ProfileFooter`'s logout button) so
  in-flight/disabled state is handled consistently without full navigation.

## Cart

Client-only state via `useReducer` + two contexts
(`CartStateContext`/`CartActionsContext`, exposed as `useCart()` /
`useCartDispatch()`). Actions: `ADD`, `INCREASE`, `DECREASE` (floors at 1),
`REMOVE`. Not persisted — a refresh clears the cart, since there's no
localStorage/sessionStorage wiring for it.

## Environment variables

```bash
VITE_API_URL=https://api.beautycode.live   # or http://localhost:8080/api locally
VITE_CRISP_WEBSITE_ID=<crisp-website-id>
```

`VITE_API_URL` is prepended to every path in `services/api.ts` — make sure
it includes any `/api` prefix your backend expects (see the infra README
for how this is routed in production via CloudFront).

## Running locally

```bash
npm install
npm run dev
```

Requires the backend (and its config server) reachable at whatever
`VITE_API_URL` points to — see the backend README for running that stack
locally with the `dev` profile.

## Known gaps / things to revisit

- `registerAction` posts to `POST /users/register`, and `useOrders` calls
  `GET /users/orders` — neither endpoint currently exists on the backend
  (`UserController` only exposes `GET /users/profile`, and there's no
  registration endpoint anywhere). Both features will silently error until
  the backend adds them.
- The cart doesn't persist across reloads — worth adding `localStorage`
  sync to `CartProvider` if that's expected behavior.
- `tokenStorage` uses `localStorage` directly, so the JWT isn't cleared on
  tab close and is readable by any script on the page (XSS exposure) — fine
  for now, but worth revisiting if this is going to production for real
  payments.
- No route currently exists for `/checkout` even though `CartSummary`'s
  "გადახდა" (pay) button implies one — it's a plain `<button>` with no
  handler yet.
