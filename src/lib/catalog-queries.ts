import { queryOptions } from "@tanstack/react-query";
import {
	getCategories,
	getHomeProducts,
	getProduct,
	getProducts,
	getProductsByCategory,
} from "../server/catalog.ts";

// Share in-flight reads and intent preloads across route loaders. Admin saves
// invalidate this prefix so edits do not wait for the freshness window.
export const catalogQueryKey = ["catalog"] as const;
const defaults = { staleTime: 30_000, retry: false } as const;

export const categoriesQuery = queryOptions({
	...defaults,
	queryKey: [...catalogQueryKey, "categories"],
	queryFn: ({ signal }) => getCategories({ signal }),
});

export const homeProductsQuery = queryOptions({
	...defaults,
	queryKey: [...catalogQueryKey, "home"],
	queryFn: ({ signal }) => getHomeProducts({ signal }),
});

export const productsQuery = (query?: string) =>
	queryOptions({
		...defaults,
		queryKey: [...catalogQueryKey, "products", query ?? ""],
		queryFn: ({ signal }) => getProducts({ data: { query }, signal }),
	});

export const categoryProductsQuery = (slug: string) =>
	queryOptions({
		...defaults,
		queryKey: [...catalogQueryKey, "category", slug],
		queryFn: ({ signal }) => getProductsByCategory({ data: { slug }, signal }),
	});

export const productQuery = (slug: string) =>
	queryOptions({
		...defaults,
		queryKey: [...catalogQueryKey, "product", slug],
		queryFn: ({ signal }) => getProduct({ data: { slug }, signal }),
	});
