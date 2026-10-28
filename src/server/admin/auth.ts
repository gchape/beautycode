export function requireAdmin(request: Request): string {
	const development = process.env.NODE_ENV === "development";
	let user = request.headers.get("x-remote-user")?.trim();
	if (development) {
		const expected = `Basic ${Buffer.from(`admin:${process.env.DEV_ADMIN_PASSWORD || "admin"}`).toString("base64")}`;
		if (request.headers.get("authorization") !== expected)
			throw new Response("Unauthorized", {
				status: 401,
				headers: { "WWW-Authenticate": 'Basic realm="Beauty Code Dev"' },
			});
		user = "admin";
	}
	if (!user || user.length > 100)
		throw new Response("Unauthorized", { status: 401 });
	if (!["GET", "HEAD", "OPTIONS"].includes(request.method)) {
		const origin = request.headers.get("origin");
		const allowed =
			(development ? new URL(request.url).origin : process.env.SITE_URL) ||
			new URL(request.url).origin;
		if (!origin || origin !== new URL(allowed).origin)
			throw new Response("Forbidden origin", { status: 403 });
	}
	return user;
}
