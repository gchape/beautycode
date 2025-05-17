import { createBrowserRouter } from "react-router";
import App from "../App";
import Products from "../features/products/Products";
import Home from "../features/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "products",
        Component: Products,
      },
    ],
  },
]);
