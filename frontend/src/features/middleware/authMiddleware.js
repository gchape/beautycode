import { redirect } from "react-router";
import { userContext } from "./context/userContext";

export const authMiddleware = async ({ context, request }) => {
  const response = await fetch("/api/me", {
    headers: {
      cookie: request.headers.get("cookie"),
    },
  });

  if (!response.ok) return redirect("/login");

  const user = await response.json();
  context.set(userContext, user);
};
