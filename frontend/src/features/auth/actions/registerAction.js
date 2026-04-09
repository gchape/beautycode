import { redirect } from "react-router";
import { RegisterForm } from "src/features/schema/registerSchema";
import { api } from "src/lib/api";

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData.entries());

  const parsed = RegisterForm.safeParse(entries);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  let response;
  try {
    response = await api.post("/register", parsed.data);
  } catch {
    return { error: "ქსელის შეცდომა, გთხოვთ სცადოთ მოგვიანებით" };
  }

  if (response.status === 409) return { error: "ელ-ფოსტა უკვე გამოყენებულია" };
  
  if (!response.ok) return { error: "დაფიქსირდა შეცდომა, სცადეთ მოგვიანებით" };

  return redirect("/login");
};
