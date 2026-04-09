import { redirect } from "react-router";
import { api } from "src/lib/api";

export const logoutAction = async () => {
  try {
    await api.post("/logout");
  } catch {
    // best-effort logout — redirect regardless
  }
  return redirect("/login");
};
