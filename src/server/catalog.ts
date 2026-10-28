import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getProducts = createServerFn({ method: "GET" })
	.validator(z.object({ query: z.string().max(200).optional() }))
	.handler(async ({ data }) => {
		const { readProducts } = await import("./database");
		return readProducts(data.query);
	});

export const getCategories = createServerFn({ method: "GET" }).handler(
	async () => {
		const { readCategories } = await import("./database");
		return readCategories();
	},
);
