import { createBrowserRouter } from "react-router";
import { requireAuthMiddleware } from "src/entities/auth";
import { ErrorPage } from "src/ui/shared/ErrorPage";
import { NotFoundPage } from "src/ui/shared/NotFoundPage";
import { Root } from "./Root";

// Each route below is a "route module": one file under src/routes that
// exports its own Component (+ loader/action/middleware as needed).
// lazy() code-splits it and keeps router.tsx as the single source of
// truth for the URL tree, instead of scattering routing across features.
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      { index: true, lazy: () => import("src/routes/home") },
      { path: "cart", lazy: () => import("src/routes/cart") },
      {
        path: "profile",
        middleware: [requireAuthMiddleware],
        lazy: () => import("src/routes/profile"),
      },
      { path: "products", lazy: () => import("src/routes/products") },
      { path: "terms-and-conditions", lazy: () => import("src/routes/terms") },
      { path: "*", Component: NotFoundPage },
    ],
  },
  { path: "/login", lazy: () => import("src/routes/login") },
  { path: "/logout", lazy: () => import("src/routes/logout") },
  { path: "/register", lazy: () => import("src/routes/register") },
  { path: "/subscribe", lazy: () => import("src/routes/subscribe") },
]);
