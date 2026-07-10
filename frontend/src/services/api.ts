const API_BASE = import.meta.env.VITE_API_URL;

interface RequestOptions extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
}

const request = async (
  url: string,
  { headers = {}, ...options }: RequestOptions = {},
): Promise<Response> => {
  const response = await fetch(`${API_BASE}${url}`, {
    credentials: "include",
    ...options,
    headers,
  });
  return response;
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

  postForm: (
    url: string,
    params: Record<string, string>,
    headers: Record<string, string> = {},
  ) =>
    request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headers,
      },
      body: new URLSearchParams(params),
    }),
};
