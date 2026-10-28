import { createMiddleware, createStart } from "@tanstack/react-start";

const protectAdmin = createMiddleware().server(async ({ request, next }) => {
	const path = new URL(request.url).pathname;
	if (path === "/admin" || path.startsWith("/admin/")) {
		const { requireAdmin } = await import("./server/admin/auth");
		try {
			requireAdmin(request);
		} catch (error) {
			if (error instanceof Response) return error;
			throw error;
		}
	}
	return next();
});
export const startInstance = createStart(() => ({
	requestMiddleware: [protectAdmin],
}));
