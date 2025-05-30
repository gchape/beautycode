import { useQuery } from "@tanstack/react-query";
import type { Product } from "../app/types";

export function useProducts(category?: string) {
  const { data: products, isPending } = useQuery<Product[]>({
    queryKey: ["products", category ?? "all"],
    queryFn: async () => {
      const url = category
        ? `${import.meta.env.VITE_API_URL}/api/products/${category}`
        : `${import.meta.env.VITE_API_URL}/api/products`;

      const response = await fetch(url);
      
      if (!response.ok) 
        throw new Error("Failed to fetch");

      return response.json();
    },
    enabled: true,
    staleTime: 10_000,
  });

  return { products, isPending };
}
