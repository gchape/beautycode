import { redirect } from "react-router";

export const logoutAction = async ({ request }) => {
  await fetch("/api/logout", {
    method: "POST",
    headers: {
      cookie: request.headers.get("cookie"),
    },
  });

  return redirect("/login");
};
