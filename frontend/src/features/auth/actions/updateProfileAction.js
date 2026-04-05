import { redirect } from "react-router";

export const updateProfileAction = async ({ request, params }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  let response;
  try {
    response = await fetch(`/api/user/${params.id}/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });
  } catch {
    return { error: "ქსელის შეცდომა, სცადეთ მოგვიანებით" };
  }

  if (response.status === 401) {
    throw redirect("/login");
  }

  if (response.status === 409) {
    return { error: "ეს ელფოსტა უკვე გამოყენებულია" };
  }

  if (!response.ok) {
    return { error: "რაღაც შეცდომა მოხდა" };
  }

  throw redirect("/profile");
};
