import { createFileRoute } from "@tanstack/react-router";
import { adminRequest, readJson } from "../server/admin/http.ts";
import { listProducts, saveProduct } from "../server/admin/repository.ts";
import { getDatabase } from "../server/database.ts";

export const Route = createFileRoute("/admin/api/products")({
	server: {
		handlers: {
			GET: ({ request }) =>
				adminRequest(request, () => listProducts(getDatabase())),
			POST: ({ request }) =>
				adminRequest(request, async (user) =>
					saveProduct(getDatabase(), await readJson(request), user),
				),
		},
	},
});
