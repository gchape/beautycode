import { createContext } from "react";
import { redirect } from "react-router";
import { api } from "../../services/api";

export const userContext = createContext(null);

export const authMiddleware = async ({ context, request }) => {
  return api
    .get("/me", {
      headers: {
        "X-API-Version": "1",
        Cookie: request.headers.get("cookie"),
      },
    })
    .then((response) => {
      if (!response.ok) throw redirect("/login");

      return response.json();
    })
    .then((user) => {
      if (!user) throw redirect("/login");

      context.set(userContext, user);
    })
    .catch(() => redirect("/login"));
};
