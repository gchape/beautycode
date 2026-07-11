import { http, toApiError } from "src/lib/http";
import type { User } from "./types";

export const userApi = {
  async profile(): Promise<User> {
    try {
      return await http.get("users/profile").json<User>();
    } catch (error) {
      throw await toApiError(error);
    }
  },
};
