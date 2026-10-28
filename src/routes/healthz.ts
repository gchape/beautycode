import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/healthz")({
	server: {
		handlers: {
			GET: async () => {
				try {
					const { getDatabase } = await import("../server/database");
					getDatabase().prepare("SELECT 1").get();
					return Response.json({ status: "ok" });
				} catch {
					return Response.json({ status: "unavailable" }, { status: 503 });
				}
			},
		},
	},
});
