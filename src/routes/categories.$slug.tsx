import { createFileRoute, notFound } from "@tanstack/react-router";
import { Breadcrumb } from "../components/breadcrumb.tsx";
import { ProductGrid } from "../components/catalog/product-grid.tsx";
import {
	categoriesQuery,
	categoryProductsQuery,
} from "../lib/catalog-queries.ts";
import { breadcrumbData, categoryPath, seoHead } from "../lib/seo.ts";

export const Route = createFileRoute("/categories/$slug")({
	loader: async ({ params, context }) => {
		const [categories, products] = await Promise.all([
			context.queryClient.fetchQuery(categoriesQuery),
			context.queryClient.fetchQuery(categoryProductsQuery(params.slug)),
		]);
		const category = categories.find((c) => c.slug === params.slug);
		if (!category) throw notFound();
		return {
			category,
			products,
		};
	},
	head: ({ loaderData }) =>
		loaderData
			? seoHead({
					title: loaderData.category.name,
					description:
						loaderData.category.description || loaderData.category.name,
					path: categoryPath(loaderData.category.slug),
					data: breadcrumbData([
						{ name: "მთავარი", path: "/" },
						{
							name: loaderData.category.name,
							path: categoryPath(loaderData.category.slug),
						},
					]),
				})
			: {},
	component: () => {
		const { category, products } = Route.useLoaderData();
		return (
			<section className="site-container page-section">
				<Breadcrumb title={category.name} />
				<span className="block text-[0.8125rem] font-medium tracking-[0.13em] max-[560px]:text-xs">
					BEAUTY CODE-ის კოლექცია
				</span>
				<h1>{category.name}</h1>
				<p className="mb-8.75 text-muted-foreground">{category.description}</p>
				<h2 className="sr-only">პროდუქტების სია</h2>
				<ProductGrid products={products} />
			</section>
		);
	},
});
