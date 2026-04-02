import { redirect } from "react-router";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const password = formData.get("password");
  const email = formData.get("email");

  let response;
  try {
    response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
  } catch {
    return { error: "Network error, please try again later" };
  }

  if (response.status === 401) {
    return { error: "Invalid credentials, please try again" };
  }

  if (response.status === 429) {
    return { error: "Too many attempts, please try again later" };
  }

  if (!response.ok) {
    return { error: "Something went wrong, please try again later" };
  }

  return redirect("/profile");
};
