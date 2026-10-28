import { createFileRoute } from "@tanstack/react-router";
import { adminRequest } from "../server/admin/http.ts";
import { recordAudit } from "../server/admin/repository.ts";
import { createBackup } from "../server/backup.ts";
import { getDatabase } from "../server/database.ts";

export const Route = createFileRoute("/admin/api/backup")({
	server: {
		handlers: {
			POST: ({ request }) =>
				adminRequest(request, async (user) => {
					const result = await createBackup(getDatabase());
					recordAudit(getDatabase(), user, "backup", "database", result.key);
					return result;
				}),
		},
	},
});
