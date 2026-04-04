import { redirect } from "react-router";
import { LoginForm } from "src/features/schema/loginSchema";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const formEntries = Object.fromEntries(formData.entries());

  const login = LoginForm.safeParse(formEntries);

  if (!login.success) {
    return {
      error: login.error.issues[0].message,
    };
  }

  let response;
  try {
    response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login.data),
      credentials: "include",
    });
  } catch {
    return { error: "Network error, please try again later" };
  }

  if (response.status === 401) {
    return { error: "Invalid credentials, please try again" };
  }

  if (!response.ok) {
    return { error: "Something went wrong, please try again later" };
  }

  return redirect("/profile");
};
