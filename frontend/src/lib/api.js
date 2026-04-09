const request = async (url, options = {}) => {
  const response = await fetch(url, { credentials: "include", ...options });
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

  postForm: (url, params) =>
    request(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(params),
    }),
};
