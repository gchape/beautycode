import { createFileRoute } from "@tanstack/react-router";
import { adminRequest } from "../server/admin/http";
import { audit } from "../server/admin/repository";
import { createBackup } from "../server/backup";
import { getDatabase } from "../server/database";
export const Route = createFileRoute("/admin/api/backup")({
	server: {
		handlers: {
			POST: ({ request }) =>
				adminRequest(request, async (user) => {
					const result = await createBackup(getDatabase());
					audit(getDatabase(), user, "backup", "database", result.key);
					return result;
				}),
		},
	},
});
