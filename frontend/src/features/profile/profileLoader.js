import { redirect } from "react-router";
import { api } from "src/services/api";
import { userContext } from "../middleware/authMiddleware";

export const profileLoader = async ({ context }) => {
  const principal = context.get(userContext);
  if (!principal?.email) return redirect("/login");

  return api
    .get(`/users/${principal.email}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw redirect("/login");
    })
    .catch(() => redirect("/login"))
    .then((user) => ({ user }));
};
