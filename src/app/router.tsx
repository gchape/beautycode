import { createBrowserRouter, type LoaderFunctionArgs } from "react-router";
import App from "../App";
import type { Product } from "./types";
import Products from "../features/products/Products";
import FallbackSpinner from "../components/spinner/FallbackSpinner";
import Home from "../components/home/Home";

export const productLoader = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
    if (!res.ok) {
      throw new Error("Failed to load products");
    }
    const products = (await res.json()) as Product[];
    return { products };
  } catch (err) {
    throw new Response("Error loading products", { status: 500 });
  }
};

export const categoryLoader = async ({ params }: LoaderFunctionArgs) => {
  const category = params.category;
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/products?category=${category}`
    );
    if (!res.ok) {
      throw new Error("Failed to load products");
    }
    const products = (await res.json()) as Product[];
    return { products };
  } catch (err) {
    throw new Response("Error loading products", { status: 500 });
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
        loader: productLoader,
        hydrateFallbackElement: <FallbackSpinner />,
      },
      {
        path: "products/:category",
        Component: Products,
        loader: categoryLoader,
        hydrateFallbackElement: <FallbackSpinner />,
      },
    ],
  },
]);
