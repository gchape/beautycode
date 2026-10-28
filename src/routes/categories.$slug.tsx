import { createFileRoute, notFound } from "@tanstack/react-router";
import { Breadcrumb } from "../components/breadcrumb.tsx";
import { ProductGrid } from "../components/catalog/product-grid.tsx";
import { breadcrumbData, categoryPath, seoHead } from "../lib/seo.ts";
import { getCategories, getProductsByCategory } from "../server/catalog.ts";

export const Route = createFileRoute("/categories/$slug")({
	loader: async ({ params }) => {
		const categories = await getCategories();
		const category = categories.find((c) => c.slug === params.slug);
		if (!category) throw notFound();
		const products = await getProductsByCategory({
			data: { slug: category.slug },
		});
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
			<section className="mx-auto w-[min(1240px,calc(100%-80px))] max-[1100px]:w-[calc(100%-48px)] max-[560px]:w-[calc(100%-32px)] min-h-[60vh] pt-[25px] pb-20 [&>h1]:mt-4 [&>h1]:mb-6 [&>h1]:text-4xl max-[560px]:[&>h1]:text-3xl">
				<Breadcrumb title={category.name} />
				<span className="block text-[0.8125rem] font-medium tracking-[0.13em] max-[560px]:text-xs">
					BEAUTY CODE-ის კოლექცია
				</span>
				<h1>{category.name}</h1>
				<p className="mb-[35px] text-muted-foreground">
					{category.description}
				</p>
				<ProductGrid products={products} />
			</section>
		);
	},
});
