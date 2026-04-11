import { redirect } from "react-router";
import { api } from "src/services/api";

export const loginAction = ({ request }) => {
  return request
    .formData()
    .then((formData) => Object.fromEntries(formData.entries()))
    .then((data) =>
      api.post("/auth/login", {
        email: data.email,
        password: data.password,
      }),
    )
    .then((response) => {
      if (response.ok) {
        return redirect("/profile");
      }

      return { error: "Login failed" };
    })
    .catch(() => ({ error: "Network error" }));
};
