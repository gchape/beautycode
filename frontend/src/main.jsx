import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import {
  Login,
  loginAction,
  logoutAction,
  Register,
  registerAction,
} from "./features/auth";
import { Cart, CartProvider } from "./features/cart";
import { BrandEthos, Hero, Home } from "./features/home";
import { PrivacyPolicy, TermsOfService } from "./features/legal";
import { authMiddleware } from "./features/middleware/authMiddleware";
import {
  CategoryProvider,
  FeaturedProducts,
  ProductsCatalog,
} from "./features/product";
import { Profile, profileLoader } from "./features/profile";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: (
          <main>
            <Hero />
            <FeaturedProducts />
            <BrandEthos />
          </main>
        ),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "profile",
        element: <Profile />,
        middleware: [authMiddleware],
        loader: profileLoader,
      },
      {
        path: "products",
        element: <ProductsCatalog />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/logout",
    action: logoutAction,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "terms-of-service",
    element: <TermsOfService />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <CategoryProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CategoryProvider>
  </CartProvider>,
);
