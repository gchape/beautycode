import { http, toApiError } from "src/lib/http";
import type { Order } from "./types";

export const orderApi = {
  async list(): Promise<Order[]> {
    try {
      return await http.get("users/orders").json<Order[]>();
    } catch (error) {
      throw await toApiError(error);
    }
  },
};
