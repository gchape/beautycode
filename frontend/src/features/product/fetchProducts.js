import { api } from "src/services/api";

export const fetchProducts = async ({ queryKey }) => {
  const [, category] = queryKey;

  const url =
    category && category !== "all"
      ? `/products?category=${category}`
      : "/products";

  const res = await api.get(url);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};
