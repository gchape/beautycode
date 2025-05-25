import { createBrowserRouter, type LoaderFunctionArgs } from "react-router";
import App from "../App";
import Home from "../features/home/Home";
import type { Product } from "./types";
import Fallback from "../components/spinner/Fallback";
import { Suspense } from "react";
import Products from "../features/products/Products";

export const productLoader = async () => {
  try {
    const res = await fetch("/api/products");
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
    const res = await fetch(`/api/products?category=${category}`);
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
      },
      {
        path: "products",
        Component: () => (
          <Suspense fallback={<Fallback />}>
            <Products />
          </Suspense>
        ),
        loader: productLoader,
      },
      {
        path: "products/:category",
        Component: () => (
          <Suspense fallback={<Fallback />}>
            <Products />
          </Suspense>
        ),
        loader: categoryLoader,
      },
    ],
  },
]);
