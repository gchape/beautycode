import { redirect } from "react-router";
import { api } from "src/services/api";

export const loginAction = ({ request }) => {
  return request
    .formData()
    .then((formData) => {
      const entries = Object.fromEntries(formData.entries());

      return api.postForm("/login", {
        email: entries.email,
        password: entries.password,
        "remember-me": "true",
      });
    })
    .then((response) => {
      if (response.status === 401) {
        return { error: "არასწორი მონაცემები, სცადეთ თავიდან" };
      }

      if (!response.ok) {
        return { error: "დაფიქსირდა შეცდომა, სცადეთ მოგვიანებით" };
      }

      return redirect("/profile");
    })
    .catch(() => ({
      error: "ქსელის შეცდომა, გთხოვთ სცადოთ მოგვიანებით",
    }));
};
