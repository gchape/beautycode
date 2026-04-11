import { redirect } from "react-router";
import { api } from "src/services/api";

export const profileLoader = async () => {
  const response = await api.get("/users/profile");

  if (!response.ok) {
    throw redirect("/login");
  }

  return { user: await response.json() };
};
