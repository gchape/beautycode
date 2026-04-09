import { redirect } from "react-router";
import { api } from "src/lib/api";
import { userContext } from "./context/userContext";

export const authMiddleware = async ({ context, request }) => {
  let response;
  try {
    response = await api.get("/me", { cookie: request.headers.get("cookie") });
  } catch {
    return redirect("/login");
  }

  if (!response.ok) return redirect("/login");

  const user = await response.json();
  context.set(userContext, user);
};
