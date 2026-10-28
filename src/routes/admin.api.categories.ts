import { createFileRoute } from "@tanstack/react-router";
import { adminRequest, readJson } from "../server/admin/http.ts";
import { listCategories, saveCategory } from "../server/admin/repository.ts";
import { getDatabase } from "../server/database.ts";
export const Route = createFileRoute("/admin/api/categories")({
	server: {
		handlers: {
			GET: ({ request }) =>
				adminRequest(request, () => listCategories(getDatabase())),
			POST: ({ request }) =>
				adminRequest(request, async (user) =>
					saveCategory(getDatabase(), await readJson(request), user),
				),
		},
	},
});
