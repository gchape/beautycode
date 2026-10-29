import type { Category, PublicProduct } from "../data/catalog.ts";
import { absoluteUrl, categoryPath, productPath } from "../lib/seo.ts";

const xmlEntities: Record<string, string> = {
	"<": "&lt;",
	">": "&gt;",
	"&": "&amp;",
	'"': "&quot;",
	"'": "&apos;",
};

export const escapeXml = (value: string) =>
	value.replace(/[<>&"']/g, (c) => xmlEntities[c]);

const url = (path: string, lastmod?: string | null) =>
	`<url><loc>${escapeXml(absoluteUrl(path))}</loc>${
		lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : ""
	}</url>`;

const staticPaths = ["/", "/products", "/terms", "/returns", "/delivery"];

export function sitemapXml(categories: Category[], products: PublicProduct[]) {
	const entries = [
		...staticPaths.map((path) => url(path)),
		...categories.map((c) => url(categoryPath(c.slug))),
		...products.map((p) => url(productPath(p.slug), p.updated_at)),
	];

	return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`;
}
