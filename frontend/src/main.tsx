import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { CartProvider } from "src/entities/cart";
import { router } from "./app/router";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element #root not found");
}

createRoot(rootElement).render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>,
);
