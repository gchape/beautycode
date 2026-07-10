import { useQuery } from "@tanstack/react-query";
import { api } from "src/services/api";
import type { Product } from "src/types";

export const useProducts = (category: string = "all") => {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async ({ queryKey }) => {
      const [, category] = queryKey as [string, string];

      const url =
        category && category !== "all"
          ? `/products?category=${category}`
          : "/products";

      const res = await api.get(url);

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
};
