import { useQuery } from "@tanstack/react-query";
import { api } from "src/services/api";

export const useOrders = (isAuthenticated = true) => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2,
  });
};
