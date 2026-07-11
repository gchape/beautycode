import { redirect } from "react-router";
import { authApi } from "src/entities/auth";

export const action = async () => {
  authApi.logout();
  return redirect("/login");
};
