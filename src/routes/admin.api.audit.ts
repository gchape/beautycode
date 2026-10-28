import { createFileRoute } from "@tanstack/react-router";
import { adminRequest } from "../server/admin/http";
import { getDatabase } from "../server/database";

export const Route = createFileRoute("/admin/api/audit")({
	server: {
		handlers: {
			GET: ({ request }) =>
				adminRequest(request, () =>
					getDatabase()
						.prepare("SELECT * FROM admin_audit_log ORDER BY id DESC LIMIT 100")
						.all(),
				),
		},
	},
});
