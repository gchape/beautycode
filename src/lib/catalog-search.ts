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

/** Client-side filters. The text query `q` is applied in SQL by the server. */
export function filterProducts(
	products: readonly PublicProduct[],
	search: CatalogSearch,
): PublicProduct[] {
	return products
		.filter(
			(p) =>
				(!search.category || p.category_slug === search.category) &&
				(!search.discount || finalPrice(p) < p.price_minor) &&
				(search.max === undefined || finalPrice(p) <= search.max * 100),
		)
		.sort((a, b) =>
			search.sort === "price-asc"
				? finalPrice(a) - finalPrice(b)
				: search.sort === "price-desc"
					? finalPrice(b) - finalPrice(a)
					: newestFirst(a, b),
		);
}
