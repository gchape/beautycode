import { redirect } from "react-router";
import { api } from "src/services/api";

export const registerAction = ({ request }) => {
  return request
    .formData()
    .then((formData) => Object.fromEntries(formData.entries()))
    .then((entries) => api.post("/users", entries))
    .then((response) => {
      if (response.status === 409) {
        return { error: "ელ-ფოსტა უკვე გამოყენებულია" };
      }

      if (!response.ok) {
        return { error: "დაფიქსირდა შეცდომა, სცადეთ მოგვიანებით" };
      }

      return redirect("/login");
    })
    .catch(() => ({
      error: "ქსელის შეცდომა, გთხოვთ სცადოთ მოგვიანებით",
    }));
};
