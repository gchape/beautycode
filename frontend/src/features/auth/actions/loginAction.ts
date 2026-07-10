import { redirect, type ActionFunctionArgs } from "react-router";
import { api } from "src/services/api";

export const loginAction = ({ request }: ActionFunctionArgs) => {
  return request
    .formData()
    .then(
      (formData) =>
        Object.fromEntries(formData.entries()) as Record<string, string>,
    )
    .then((data) =>
      api.postForm("/login", {
        email: data.email,
        password: data.password,
        ...(data["remember-me"] && { "remember-me": "on" }),
      }),
    )
    .then((response) => {
      if (response.ok) return redirect("/");
      if (response.status === 401)
        return { error: "არასწორი მონაცემები, სცადეთ თავიდან" };
      return { error: "დაფიქსირდა შეცდომა, სცადეთ მოგვიანებით" };
    })
    .catch(() => ({ error: "ქსელის შეცდომა, გთხოვთ სცადოთ მოგვიანებით" }));
};
