import {
	createCsrfMiddleware,
	createMiddleware,
	createStart,
} from "@tanstack/react-start";
import { validateProductionEnvironment } from "./server/config.ts";

const csrfMiddleware = createCsrfMiddleware({
	filter: (ctx) => ctx.handlerType === "serverFn",
});

let environmentValidated = false;

const protectAdmin = createMiddleware().server(async ({ request, next }) => {
	if (!environmentValidated) {
		try {
			validateProductionEnvironment();
			environmentValidated = true;
		} catch (error) {
			console.error(error);
			return Response.json(
				{ error: "Server environment is not configured correctly" },
				{ status: 500 },
			);
		}
	}
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
