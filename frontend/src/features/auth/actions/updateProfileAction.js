import { redirect } from "react-router";
import { UpdateProfile } from "src/features/schema/updateProfileSchema";

const parseFormData = (formData) => {
  const { email, phone } = Object.fromEntries(formData.entries());
  return UpdateProfile.safeParse({ email, phone });
};

const buildPayload = (data, shouldUpdateEmail, shouldUpdatePhone) => {
  const payload = {};
  if (shouldUpdateEmail) payload.email = data.email;
  if (shouldUpdatePhone) payload.phone = data.phone;
  return payload;
};

const patchProfile = async (payload, cookie) => {
  return fetch("/api/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      cookie: cookie ?? "",
    },
    body: JSON.stringify(payload),
  });
};

const handleResponse = (response) => {
  if (!response.ok) return { error: "რაღაც შეცდომა მოხდა, სცადეთ მოგვიანებით" };

  switch (response.status) {
    case 409:
      return { error: "ეს ელფოსტა უკვე გამოყენებულია" };
    case 401:
      throw redirect("/login");
    default:
      throw redirect("/profile");
  }
};

export const updateProfileAction = async ({ request }) => {
  const url = new URL(request.url);
  const shouldUpdateEmail = url.searchParams.get("email") === "true";
  const shouldUpdatePhone = url.searchParams.get("phone") === "true";

  const formData = await request.formData();
  const parsed = parseFormData(formData);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const payload = buildPayload(
    parsed.data,
    shouldUpdateEmail,
    shouldUpdatePhone,
  );

  let response;
  try {
    response = await patchProfile(payload, request.headers.get("cookie"));
  } catch {
    return { error: "ქსელის შეცდომა, სცადეთ მოგვიანებით" };
  }

  return handleResponse(response);
};
