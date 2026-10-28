import { createFileRoute, notFound } from "@tanstack/react-router";
import { Breadcrumb } from "../components/breadcrumb";
import { ProductGrid } from "../components/catalog/product-grid";
import { breadcrumbData, categoryPath, seoHead } from "../lib/seo";
import { getCategories, getProducts } from "../server/catalog";

export const Route = createFileRoute("/categories/$slug")({
	loader: async ({ params }) => {
		const categories = await getCategories();
		const category = categories.find((c) => c.slug === params.slug);
		if (!category) throw notFound();
		const products = await getProducts({ data: {} });
		return {
			category,
			products: products.filter((p) => p.category_slug === category.slug),
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
			<section className="wrap page-section">
				<Breadcrumb title={category.name} />
				<span className="eyebrow">BEAUTY CODE-ის კოლექცია</span>
				<h1>{category.name}</h1>
				<p className="page-intro">{category.description}</p>
				<ProductGrid products={products} />
			</section>
		);
	},
});
