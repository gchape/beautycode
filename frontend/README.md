# BeautyCode Frontend

Modern React + TypeScript single-page application for **BeautyCode**, an
e-commerce storefront for beauty devices. The application communicates with
the Spring Boot backend through a centralized HTTP client, provides
authentication, product browsing, shopping cart management, customer
profiles, newsletter subscriptions, and live chat.

## Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **React Router v8** (route modules, middleware, loaders/actions)
- **Tailwind CSS v4**
- **ky** (HTTP client)
- **Lucide React** (icons)
- **Crisp** (lazy-loaded live chat)
- **ESLint + TypeScript ESLint**

---

# Project Structure

```
src/
├── app/
│   ├── Root.tsx
│   ├── router.tsx
│   └── CrispChat.tsx
│
├── entities/
│   ├── auth/
│   ├── cart/
│   ├── order/
│   ├── product/
│   └── user/
│
├── lib/
│   ├── http.ts
│   ├── cn.ts
│   └── navigation.ts
│
├── routes/
│   ├── home.tsx
│   ├── products.tsx
│   ├── cart.tsx
│   ├── profile.tsx
│   ├── login.tsx
│   ├── register.tsx
│   ├── logout.ts
│   ├── subscribe.ts
│   └── terms.tsx
│
├── ui/
│   ├── auth/
│   ├── cart/
│   ├── footer/
│   ├── home/
│   ├── legal/
│   ├── navbar/
│   ├── product/
│   ├── profile/
│   └── shared/
│
├── assets/
├── index.css
└── main.tsx
```

The project follows a lightweight **feature/entity architecture**:

- **entities** contain business logic and API communication.
- **routes** define React Router route modules.
- **ui** contains presentational components.
- **app** wires together providers, routing and application shell.

---

# Routing

Routing is configured in `src/app/router.tsx` using
`createBrowserRouter`.

| Path | Description |
|-------|-------------|
| `/` | Home page |
| `/products` | Product catalog |
| `/cart` | Shopping cart |
| `/profile` | Customer profile (protected) |
| `/terms-and-conditions` | Terms page |
| `/login` | Login |
| `/register` | Registration |
| `/logout` | Logout action |
| `/subscribe` | Newsletter subscription action |

The root layout renders:

- Site header
- Crisp chat widget
- Route outlet
- Site footer

Unknown routes render a custom **NotFoundPage**, while unexpected errors are
handled by the global **ErrorPage**.

---

# Authentication

Authentication uses JWT tokens stored in `localStorage`.

## Login

```
POST /login
```

On success:

- stores JWT
- redirects to the requested page (or `/`)
- automatically authenticates all future API requests

401 responses are displayed as inline form errors.

## Registration

```
POST /users/register
```

Successful registration redirects users to the login page.

409 responses display an email already exists message.

## Logout

Clears the stored token and redirects to `/login`.

---

# Protected Routes

Authentication is enforced through **React Router middleware** rather than
individual loaders.

```ts
middleware: [requireAuthMiddleware]
```

If no token exists the user is redirected to

```
/login?redirectTo=...
```

allowing them to continue where they left off after signing in.

---

# API Layer

All HTTP communication goes through a single `ky` instance
(`src/lib/http.ts`).

Features include:

- automatic base URL
- automatic Bearer token attachment
- request timeout
- GET retries
- centralized API error normalization

No feature manually constructs Authorization headers.

---

# Product APIs

## Product cards

```
GET /products
```

Returns product cards used on the homepage.

## Product catalog

```
GET /products/summary
```

Returns lighter catalog data with descriptions.

Both endpoints support

```
?category=...
```

filtering.

---

# User APIs

## Profile

```
GET /users/profile
```

Returns customer information.

## Orders

```
GET /users/orders
```

Returns the user's order history.

---

# Shopping Cart

The cart is implemented with React Context + `useReducer`.

Supported actions:

- ADD
- INCREASE
- DECREASE
- REMOVE

Unlike the previous version, the cart is now **persisted in localStorage**,
so refreshing the page preserves its contents.

---

# Newsletter

Newsletter subscriptions are handled through a dedicated React Router action.

```
POST /newsletter/subscribe
```

The footer form submits without navigating away from the current page.

---

# Crisp Live Chat

The Crisp widget is intentionally lazy-loaded:

- waits 3 seconds after mount
- injects the Crisp script dynamically
- cleans itself up when the component unmounts

This reduces the initial bundle's impact on page load.

---

# Styling

The project uses **Tailwind CSS v4** with custom design tokens defined in
`index.css`.

Custom typography includes:

- Cormorant Garamond
- DM Sans
- DM Mono

Instead of external UI libraries, reusable utility classes and design tokens
are used throughout the application.

---

# Environment Variables

```bash
VITE_API_URL=http://localhost:8080/api
VITE_CRISP_WEBSITE_ID=<your-crisp-id>
```

`VITE_API_URL` is used as the base URL for every API request.

---

# Running Locally

```bash
npm install

npm run dev
```

Production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

---

# Known Limitations

- Checkout flow has not yet been implemented.
- Payment integration is currently unavailable.
- Registration and orders require matching backend endpoints.
- JWTs are stored in `localStorage`, making them vulnerable to XSS attacks if
  malicious scripts are introduced.
- The application currently does not implement refresh tokens or automatic
  token renewal.

---

# Future Improvements

- Checkout flow
- Online payment integration
- Refresh token support
- Order creation
- Wishlist functionality
- Product search
- Pagination
- Image optimization
- Offline caching / PWA support
- Unit and integration tests