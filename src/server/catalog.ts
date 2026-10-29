import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const slugInput = z.object({ slug: z.string().min(1).max(200) });
const searchInput = z.object({ query: z.string().max(200).optional() });

// Dynamic imports keep the SQLite code out of the client bundle.
async function products() {
	const [{ getDatabase }, { queryPublicProducts, queryProduct }] =
		await Promise.all([import("./database.ts"), import("./products.ts")]);
	const db = getDatabase();
	return {
		list: (options?: Parameters<typeof queryPublicProducts>[1]) =>
			queryPublicProducts(db, options),
		one: (slug: string) => queryProduct(db, slug),
	};
}

export const getProducts = createServerFn({ method: "GET" })
	.validator(searchInput)
	.handler(async ({ data }) => (await products()).list({ query: data.query }));

export const getProduct = createServerFn({ method: "GET" })
	.validator(slugInput)
	.handler(async ({ data }) => (await products()).one(data.slug));

export const getProductsByCategory = createServerFn({ method: "GET" })
	.validator(slugInput)
	.handler(async ({ data }) =>
		(await products()).list({ category: data.slug }),
	);

export const getFeaturedProducts = createServerFn({ method: "GET" }).handler(
	async () => (await products()).list({ featured: true, limit: 6 }),
);

export const getCategories = createServerFn({ method: "GET" }).handler(
	async () => {
		const [{ getDatabase }, { queryCategories }] = await Promise.all([
			import("./database.ts"),
			import("./categories.ts"),
		]);
		return queryCategories(getDatabase());
	},
);
