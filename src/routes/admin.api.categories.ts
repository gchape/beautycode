import { createFileRoute } from "@tanstack/react-router";
import { adminRequest, readJson } from "../server/admin/http";
import { saveCategory } from "../server/admin/repository";
import { getDatabase } from "../server/database";
export const Route = createFileRoute("/admin/api/categories")({
	server: {
		handlers: {
			GET: ({ request }) =>
				adminRequest(request, () =>
					getDatabase()
						.prepare("SELECT * FROM categories ORDER BY sort_order,slug")
						.all(),
				),
			POST: ({ request }) =>
				adminRequest(request, async (user) =>
					saveCategory(getDatabase(), await readJson(request), user),
				),
		},
	},
});
