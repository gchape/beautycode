import { http, toApiError } from "src/lib/http";
import type { Product, ProductCard } from "./types";

export const productApi = {
  /** Full cards used on the home page hero + featured strip. */
  async list(category = "all"): Promise<ProductCard[]> {
    try {
      const searchParams = category !== "all" ? { category } : undefined;
      return await http.get("products", { searchParams }).json<ProductCard[]>();
    } catch (error) {
      throw await toApiError(error);
    }
  },

  /** Lighter payload (with description) used by the catalog grid. */
  async summary(category = "all"): Promise<Product[]> {
    try {
      const searchParams = category !== "all" ? { category } : undefined;
      return await http
        .get("products/summary", { searchParams })
        .json<Product[]>();
    } catch (error) {
      throw await toApiError(error);
    }
  },
};
