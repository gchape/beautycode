import { isDevelopment, readServerEnvironment } from "../config.ts";

const safeMethods = new Set(["GET", "HEAD", "OPTIONS"]);

export function requireAdmin(request: Request): string {
	const dev = isDevelopment();

	// The trusted proxy must strip client-supplied x-remote-user and set it only
	// after authentication. The application port must not be publicly exposed.
	const user =
		request.headers.get("x-remote-user")?.trim() || (dev ? "dev" : "");
	if (!user || user.length > 100)
		throw new Response("Unauthorized", { status: 401 });

	// CSRF defense: state-changing requests must come from our own origin.
	if (!safeMethods.has(request.method)) {
		const expected = new URL(
			(!dev && readServerEnvironment().SITE_URL) || request.url,
		).origin;
		if (request.headers.get("origin") !== expected)
			throw new Response("Forbidden origin", { status: 403 });
	}

	return user;
}
