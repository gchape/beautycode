import { createFileRoute } from "@tanstack/react-router";
import { adminRequest, readJson } from "../server/admin/http";
import { hydrateProducts, saveProduct } from "../server/admin/repository";
import { getDatabase } from "../server/database";
export const Route = createFileRoute("/admin/api/products")({
	server: {
		handlers: {
			GET: ({ request }) =>
				adminRequest(request, () =>
					hydrateProducts(
						getDatabase(),
						getDatabase()
							.prepare("SELECT * FROM products ORDER BY id DESC")
							.all(),
					),
				),
			POST: ({ request }) =>
				adminRequest(request, async (user) =>
					saveProduct(getDatabase(), await readJson(request), user),
				),
		},
	},
});
