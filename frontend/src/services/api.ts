const API_BASE = import.meta.env.VITE_API_URL;
const TOKEN_KEY = "auth_token";

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

interface RequestOptions extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
}

const request = async (
  url: string,
  { headers = {}, ...options }: RequestOptions = {},
): Promise<Response> => {
  const token = tokenStorage.get();
  return fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

export const api = {
  get: (url: string, headers: Record<string, string> = {}) =>
    request(url, { method: "GET", headers }),

  post: (url: string, body: unknown, headers: Record<string, string> = {}) =>
    request(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    }),

  upload: (url: string, formData: FormData) =>
    request(url, { method: "POST", body: formData }),
};
