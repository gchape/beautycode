import { redirect } from "react-router";

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const firstname = formData.get("firstName");
  const lastname = formData.get("lastName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  let response;
  try {
    response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        phone,
        password,
        confirmPassword,
      }),
      credentials: "include",
    });
  } catch {
    return { error: "Network error, please try again later" };
  }

  if (response.status === 409) {
    return { error: "Email already exists" };
  }

  if (!response.ok) {
    return { error: "Something went wrong, please try again later" };
  }

  return redirect("/login");
};
