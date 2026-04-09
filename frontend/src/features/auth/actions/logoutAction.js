import { redirect } from "react-router";
import { api } from "src/services/api";

export const logoutAction = async () => {
  try {
    await api.post("/logout");
    return redirect("/login");
  } catch {
    return redirect("/login");
  }
};
