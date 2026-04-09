import { redirect } from "react-router";
import { LoginForm } from "src/features/schema/loginSchema";
import { api } from "src/lib/api";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData.entries());

  const parsed = LoginForm.safeParse(entries);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  let response;
  try {
    response = await api.postForm("/login", {
      email: parsed.data.email,
      password: parsed.data.password,
      "remember-me": "true",
    });
  } catch {
    return { error: "ქსელის შეცდომა, გთხოვთ სცადოთ მოგვიანებით" };
  }

  if (response.status === 401)
    return { error: "არასწორი მონაცემები, სცადეთ თავიდან" };
  if (!response.ok) return { error: "დაფიქსირდა შეცდომა, სცადეთ მოგვიანებით" };

  return redirect("/profile");
};
