import { createBrowserRouter } from "react-router";
import Products from "../features/products/Products";
import Home from "../components/home/Home";
import App from "../App";

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
        path: "products/:category",
        Component: Products,
      },
    ],
  },
]);
