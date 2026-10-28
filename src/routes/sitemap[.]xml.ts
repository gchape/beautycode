import { createFileRoute } from "@tanstack/react-router";
import { readCategories, readProducts } from "../server/database";
import { sitemapXml } from "../server/sitemap";
export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: () =>
				new Response(sitemapXml(readCategories(), readProducts()), {
					headers: {
						"Content-Type": "application/xml; charset=utf-8",
						"Cache-Control": "public, max-age=300",
					},
				}),
		},
	},
});
