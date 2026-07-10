import { redirect } from "react-router";
import { api } from "src/services/api";
import type { ProfileLoaderData, User } from "./types";

export const profileLoader = async (): Promise<ProfileLoaderData> => {
  const response = await api.get("/users/profile");

  if (!response.ok) {
    throw redirect("/login");
  }

  return { user: (await response.json()) as User };
};
