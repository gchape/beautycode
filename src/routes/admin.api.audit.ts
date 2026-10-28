import { createFileRoute } from "@tanstack/react-router";
import { adminRequest } from "../server/admin/http.ts";
import { listAuditLog } from "../server/admin/repository.ts";
import { getDatabase } from "../server/database.ts";

export const Route = createFileRoute("/admin/api/audit")({
	server: {
		handlers: {
			GET: ({ request }) =>
				adminRequest(request, () => listAuditLog(getDatabase())),
		},
	},
});
