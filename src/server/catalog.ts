import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const slugInput = z.object({ slug: z.string().min(1).max(200) });

export const getProducts = createServerFn({ method: "GET" })
	.validator(z.object({ query: z.string().max(200).optional() }))
	.handler(async ({ data }) => {
		const { queryPublicProducts } = await import("./products.ts");
		const { getDatabase } = await import("./database.ts");
		return queryPublicProducts(getDatabase(), { query: data.query });
	});

export const getProduct = createServerFn({ method: "GET" })
	.validator(slugInput)
	.handler(async ({ data }) => {
		const { queryProduct } = await import("./products.ts");
		const { getDatabase } = await import("./database.ts");
		return queryProduct(getDatabase(), data.slug);
	});

export const getProductsByCategory = createServerFn({ method: "GET" })
	.validator(slugInput)
	.handler(async ({ data }) => {
		const { queryPublicProducts } = await import("./products.ts");
		const { getDatabase } = await import("./database.ts");
		return queryPublicProducts(getDatabase(), { category: data.slug });
	});

export const getFeaturedProducts = createServerFn({ method: "GET" }).handler(
	async () => {
		const { queryPublicProducts } = await import("./products.ts");
		const { getDatabase } = await import("./database.ts");
		return queryPublicProducts(getDatabase(), { featured: true, limit: 6 });
	},
);

export const getCategories = createServerFn({ method: "GET" }).handler(
	async () => {
		const { queryCategories } = await import("./categories.ts");
		const { getDatabase } = await import("./database.ts");
		return queryCategories(getDatabase());
	},
);
