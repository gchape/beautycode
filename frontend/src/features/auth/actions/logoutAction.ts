import { redirect } from "react-router";
import { tokenStorage } from "src/services/api";

export const logoutAction = async () => {
  tokenStorage.clear();
  return redirect("/login");
};
