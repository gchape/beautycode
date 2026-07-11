import type { ActionFunctionArgs } from "react-router";
import { http, toApiError } from "src/lib/http";

interface SubscribeActionData {
  success?: boolean;
  error?: string;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = String(formData.get("email"));

  try {
    await http.post("newsletter/subscribe", { json: { email } });
    return { success: true } satisfies SubscribeActionData;
  } catch (error) {
    const apiError = await toApiError(error);
    return { error: apiError.message } satisfies SubscribeActionData;
  }
};
