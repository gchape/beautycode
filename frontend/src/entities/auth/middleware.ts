import { redirect } from "react-router";
import { tokenStorage } from "src/lib/http";

/**
 * React Router v8 middleware runs before the route's loader/action.
 * Attach this to any route that requires authentication instead of
 * duplicating the redirect check inside every loader.
 */
export const requireAuthMiddleware = async ({
  request,
}: {
  request: Request;
}) => {
  if (!tokenStorage.get()) {
    const url = new URL(request.url);
    throw redirect(
      `/login?redirectTo=${encodeURIComponent(url.pathname + url.search)}`,
    );
  }
};
