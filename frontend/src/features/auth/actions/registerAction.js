import { redirect } from "react-router";
import { RegisterForm } from "src/features/schema/registerSchema";

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const formEntries = Object.fromEntries(formData.entries());

  const register = RegisterForm.safeParse(formEntries);

  if (!register.success) {
    return {
      error: register.error.issues[0].message,
    };
  }

  let response;
  try {
    response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register.data),
      credentials: "include",
    });
  } catch {
    return { error: "Network error, please try again later" };
  }

  if (response.status === 409) {
    return { error: "Email already exists" };
  }

  return redirect("/login");
};
