import { z } from "zod";
import { finalPrice, type Product } from "../data/catalog.ts";

export const catalogSearchSchema = z.object({
	q: z.string().max(200).optional(),
	category: z.string().optional(),
	discount: z.boolean().optional(),
	max: z.number().nonnegative().optional(),
	sort: z.enum(["newest", "price-asc", "price-desc"]).optional(),
});

export type CatalogSearch = z.infer<typeof catalogSearchSchema>;

export function filterProducts(
	products: readonly Product[],
	search: CatalogSearch,
): Product[] {
	return products
		.filter(
			(p) =>
				(!search.category || p.category_slug === search.category) &&
				(!search.discount || p.discount_percent > 0) &&
				(search.max === undefined || finalPrice(p) <= search.max * 100),
		)
		.sort((a, b) =>
			search.sort === "price-asc"
				? finalPrice(a) - finalPrice(b)
				: search.sort === "price-desc"
					? finalPrice(b) - finalPrice(a)
					: b.id - a.id,
		);
}
