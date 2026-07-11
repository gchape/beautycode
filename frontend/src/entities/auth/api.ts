import { http, tokenStorage, toApiError } from "src/lib/http";

export const authApi = {
  async login(email: string, password: string) {
    try {
      const { token } = await http
        .post("login", { json: { email, password } })
        .json<{ token: string }>();
      tokenStorage.set(token);
    } catch (error) {
      throw await toApiError(error);
    }
  },

  async register(entries: Record<string, string>) {
    try {
      await http.post("users/register", { json: entries });
    } catch (error) {
      throw await toApiError(error);
    }
  },

  logout() {
    tokenStorage.clear();
  },
};
