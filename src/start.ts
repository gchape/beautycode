import {
	createCsrfMiddleware,
	createMiddleware,
	createStart,
} from "@tanstack/react-start";

const csrfMiddleware = createCsrfMiddleware({
	filter: (ctx) => ctx.handlerType === "serverFn",
});

const protectAdmin = createMiddleware().server(async ({ request, next }) => {
	const path = new URL(request.url).pathname;
	if (path === "/admin" || path.startsWith("/admin/")) {
		const { requireAdmin } = await import("./server/admin/auth.ts");
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
	requestMiddleware: [csrfMiddleware, protectAdmin],
}));
