import { StrictMode } from "react";
import { router } from "./app/router";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
