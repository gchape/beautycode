const API_BASE = "/api";

const request = async (url, options = {}) => {
  const response = await fetch(`${API_BASE}${url}`, {
    credentials: "include",
    headers: {
      "X-API-Version": "1",
      ...(options.headers || {}),
    },
    ...options,
  });

  return response;
};

export const api = {
  get: (url, headers = {}) => request(url, { method: "GET", headers }),

  post: (url, body, headers = {}) =>
    request(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    }),

  postForm: (url, params, headers = {}) =>
    request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headers,
      },
      body: new URLSearchParams(params),
    }),
};
