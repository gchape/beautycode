import type { Category, PublicProduct } from "../data/catalog.ts";
import { absoluteUrl, categoryPath, productPath } from "../lib/seo.ts";
export const escapeXml = (value: string) =>
	value.replace(
		/[<>&"']/g,
		(c) =>
			({
				"<": "&lt;",
				">": "&gt;",
				"&": "&amp;",
				'"': "&quot;",
				"'": "&apos;",
			})[c] || c,
	);
export function sitemapXml(categories: Category[], products: PublicProduct[]) {
	const paths = [
		"/",
		"/products",
		"/terms",
		"/returns",
		"/delivery",
		...categories.map((c) => categoryPath(c.slug)),
	];
	const entries = paths.map(
		(path) => `<url><loc>${escapeXml(absoluteUrl(path))}</loc></url>`,
	);
	for (const product of products)
		entries.push(
			`<url><loc>${escapeXml(absoluteUrl(productPath(product.slug)))}</loc>${product.updated_at ? `<lastmod>${escapeXml(product.updated_at)}</lastmod>` : ""}</url>`,
		);
	return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`;
}
