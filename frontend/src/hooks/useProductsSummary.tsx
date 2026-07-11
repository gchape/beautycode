import { useQuery } from "@tanstack/react-query";
import { api } from "src/services/api";
import type { Product } from "src/types";

export const useProductsSummary = (category: string = "all") => {
  return useQuery<Product[]>({
    queryKey: ["products", "summary", category],
    queryFn: async ({ queryKey }) => {
      const [, , category] = queryKey as [string, string, string];

      const url =
        category && category !== "all"
          ? `/products/summary?category=${category}`
          : "/products/summary";

      const res = await api.get(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
};
