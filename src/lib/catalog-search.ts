import { z } from "zod";
import { finalPrice, type PublicProduct } from "../data/catalog.ts";

export const catalogSearchSchema = z.object({
	q: z.string().max(200).optional(),
	category: z.string().optional(),
	discount: z.boolean().optional(),
	max: z.number().nonnegative().optional(),
	sort: z.enum(["newest", "price-asc", "price-desc"]).optional(),
});

export type CatalogSearch = z.infer<typeof catalogSearchSchema>;

const newestFirst = (a: PublicProduct, b: PublicProduct) =>
	(b.created_at ?? "").localeCompare(a.created_at ?? "") || b.id - a.id;

const productSorters = {
	newest: newestFirst,
	"price-asc": (a: PublicProduct, b: PublicProduct) =>
		finalPrice(a) - finalPrice(b),
	"price-desc": (a: PublicProduct, b: PublicProduct) =>
		finalPrice(b) - finalPrice(a),
};

/** Client-side filters. The text query `q` is applied in SQL by the server. */
export function filterProducts(
	products: readonly PublicProduct[],
	search: CatalogSearch,
): PublicProduct[] {
	return products
		.filter(
			(product) =>
				(!search.category || product.category_slug === search.category) &&
				(!search.discount || finalPrice(product) < product.price_minor) &&
				(search.max === undefined || finalPrice(product) <= search.max * 100),
		)
		.sort(productSorters[search.sort ?? "newest"]);
}
