import { finalPrice, type PublicProduct } from "../data/catalog.ts";
export const siteOrigin = (
	import.meta.env?.VITE_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");
export const absoluteUrl = (path: string) =>
	new URL(path, `${siteOrigin}/`).href;
export const productPath = (slug: string) =>
	`/products/${encodeURIComponent(slug)}`;
export const categoryPath = (slug: string) =>
	`/categories/${encodeURIComponent(slug)}`;
export const serializeJsonLd = (data: unknown) =>
	JSON.stringify(data).replace(/</g, "\\u003c");
export function seoHead({
	title,
	description,
	path,
	image = "/logo.jpg",
	data,
	noindex = false,
}: {
	title: string;
	description: string;
	path: string;
	image?: string;
	data?: unknown;
	noindex?: boolean;
}) {
	const url = absoluteUrl(path);
	return {
		meta: [
			{ title: `${title} | Beauty Code` },
			{ name: "description", content: description },
			{ property: "og:title", content: `${title} | Beauty Code` },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },
			{ property: "og:image", content: absoluteUrl(image) },
			{ property: "og:type", content: "website" },
			{ property: "og:locale", content: "ka_GE" },
			{ property: "og:site_name", content: "Beauty Code" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: `${title} | Beauty Code` },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: absoluteUrl(image) },
			...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
		],
		links: [{ rel: "canonical", href: url }],
		scripts: data
			? [{ type: "application/ld+json", children: serializeJsonLd(data) }]
			: [],
	};
}
export function breadcrumbData(items: { name: string; path: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: absoluteUrl(item.path),
		})),
	};
}
export function productData(product: PublicProduct) {
	const availability = {
		in_stock: "InStock",
		out_of_stock: "OutOfStock",
		preorder: "PreOrder",
	}[product.stock_status];
	return {
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.name,
		description: product.description,
		image: product.images.map((image) => absoluteUrl(image.url)),
		brand: product.brand
			? { "@type": "Brand", name: product.brand }
			: undefined,
		offers: {
			"@type": "Offer",
			url: absoluteUrl(productPath(product.slug)),
			priceCurrency: "GEL",
			price: (finalPrice(product) / 100).toFixed(2),
			availability: `https://schema.org/${availability}`,
			itemCondition: "https://schema.org/NewCondition",
		},
	};
}
