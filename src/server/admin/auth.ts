import { isDevelopment } from "../config.ts";

export function requireAdmin(request: Request): string {
	// The trusted proxy must strip client-supplied x-remote-user and set it only
	// after authentication. The application port must not be publicly exposed.
	const user =
		request.headers.get("x-remote-user")?.trim() ||
		(isDevelopment() ? "dev" : "");
	if (!user || user.length > 100)
		throw new Response("Unauthorized", { status: 401 });
	if (!["GET", "HEAD", "OPTIONS"].includes(request.method)) {
		if (isDevelopment())
			throw Response.json(
				{ error: "დეველოპმენტში ადმინისტრირება მხოლოდ წასაკითხია" },
				{ status: 403 },
			);
		const origin = request.headers.get("origin");
		const allowed = process.env.SITE_URL || new URL(request.url).origin;
		if (!origin || origin !== new URL(allowed).origin)
			throw new Response("Forbidden origin", { status: 403 });
	}
	return user;
}
