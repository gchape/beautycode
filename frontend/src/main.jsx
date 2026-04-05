import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { loginAction } from "./features/auth/actions/loginAction";
import { logoutAction } from "./features/auth/actions/logoutAction";
import { registerAction } from "./features/auth/actions/registerAction";
import { updateProfileAction } from "./features/auth/actions/updateProfileAction";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Cart from "./features/cart/Cart";
import BrandEthos from "./features/home/BrandEthos";
import Hero from "./features/home/Hero";
import Home from "./features/home/Home";
import PrivacyPolicy from "./features/legal/PrivacyPolicy";
import TermsOfService from "./features/legal/TermsOfService";
import { authMiddleware } from "./features/middleware/authMiddleware";
import { userContext } from "./features/middleware/context/userContext";
import FeaturedProducts from "./features/product/FeaturedProducts";
import ProductsCatalog from "./features/product/ProductsCatalog";
import Profile from "./features/profile/Profile";
import CartContextStateProvider from "./features/providers/CartProvider";
import CategoryProvider from "./features/providers/CategoryProvider";
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
        loader: ({ context }) => {
          const user = context.get(userContext);
          return { user };
        },
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
  {
    path: "/user/:id/profile",
    action: updateProfileAction,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <CartContextStateProvider>
    <CategoryProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CategoryProvider>
  </CartContextStateProvider>,
);
