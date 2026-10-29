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

type Compare = (a: PublicProduct, b: PublicProduct) => number;

const byPrice: Compare = (a, b) => finalPrice(a) - finalPrice(b);

const sorters: Record<NonNullable<CatalogSearch["sort"]>, Compare> = {
	newest: (a, b) =>
		(b.created_at ?? "").localeCompare(a.created_at ?? "") || b.id - a.id,
	"price-asc": byPrice,
	"price-desc": (a, b) => byPrice(b, a),
};

/** Client-side filters. The text query `q` is applied in SQL by the server. */
export function filterProducts(
	products: readonly PublicProduct[],
	{ category, discount, max, sort = "newest" }: CatalogSearch,
): PublicProduct[] {
	const maxMinor = max === undefined ? Infinity : Math.round(max * 100);

	return products
		.filter((product) => {
			const price = finalPrice(product);
			return (
				(!category || product.category_slug === category) &&
				(!discount || price < product.price_minor) &&
				price <= maxMinor
			);
		})
		.sort(sorters[sort]);
}
