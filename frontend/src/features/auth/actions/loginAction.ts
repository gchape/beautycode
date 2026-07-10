import { redirect, type ActionFunctionArgs } from "react-router";
import { api, tokenStorage } from "src/services/api";

export const loginAction = ({ request }: ActionFunctionArgs) => {
  return request
    .formData()
    .then(
      (formData) =>
        Object.fromEntries(formData.entries()) as Record<string, string>,
    )
    .then((data) =>
      api.post("/login", {
        email: data.email,
        password: data.password,
      }),
    )
    .then(async (response) => {
      if (response.ok) {
        const { token } = (await response.json()) as { token: string };
        tokenStorage.set(token);
        return redirect("/");
      }
      if (response.status === 401)
        return { error: "არასწორი მონაცემები, სცადეთ თავიდან" };
      return { error: "დაფიქსირდა შეცდომა, სცადეთ მოგვიანებით" };
    })
    .catch(() => ({ error: "ქსელის შეცდომა, გთხოვთ სცადოთ მოგვიანებით" }));
};
