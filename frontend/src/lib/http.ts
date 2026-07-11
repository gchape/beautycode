import ky, { HTTPError } from "ky";

const TOKEN_KEY = "auth_token";

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export const http = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  retry: { limit: 1, methods: ["get"] },
  timeout: 10_000,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = tokenStorage.get();
        if (token) request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
  },
});

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const toApiError = async (error: unknown): Promise<ApiError> => {
  if (error instanceof HTTPError) {
    return new ApiError(error.message, error.response.status);
  }
  return new ApiError(
    error instanceof Error ? error.message : "ქსელის შეცდომა",
    0,
  );
};
