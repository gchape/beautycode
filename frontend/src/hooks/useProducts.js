import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "src/features/product/fetchProducts";

export const useProducts = (category = "all") => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: ({ queryKey }) => fetchProducts({ queryKey }),
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};
