import { createFileRoute } from "@tanstack/react-router";
import { queryCategories } from "../server/categories.ts";
import { getDatabase } from "../server/database.ts";
import { queryPublicProducts } from "../server/products.ts";
import { sitemapXml } from "../server/sitemap.ts";

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: () => {
				const db = getDatabase();
				return new Response(
					sitemapXml(queryCategories(db), queryPublicProducts(db)),
					{
						headers: {
							"Content-Type": "application/xml; charset=utf-8",
							"Cache-Control": "public, max-age=300",
						},
					},
				);
			},
		},
	},
});
