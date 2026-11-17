import { createFileRoute, notFound } from "@tanstack/react-router";
import { Breadcrumb } from "../components/breadcrumb.tsx";
import { ProductGallery } from "../components/catalog/product-gallery.tsx";
import { ProductInformation } from "../components/catalog/product-information.tsx";
import { ProductPurchaseBar } from "../components/catalog/product-purchase-bar.tsx";
import { ProductSummary } from "../components/catalog/product-summary.tsx";
import { coverImage } from "../data/catalog.ts";
import { productQuery } from "../lib/catalog-queries.ts";
import {
	breadcrumbData,
	productData,
	productPath,
	seoHead,
} from "../lib/seo.ts";
export const Route = createFileRoute("/products/$slug")({
	loader: async ({ params, context }) => {
		const product = await context.queryClient.fetchQuery(
			productQuery(params.slug),
		);
		if (!product) throw notFound();
		return product;
	},
	head: ({ loaderData: product }) =>
		product
			? seoHead({
					title: product.name,
					description:
						product.meta_description || product.description.slice(0, 180),
					path: productPath(product.slug),
					image: coverImage(product) || undefined,
					data: [
						productData(product),
						breadcrumbData([
							{ name: "მთავარი", path: "/" },
							{ name: "პროდუქტები", path: "/products" },
							{ name: product.name, path: productPath(product.slug) },
						]),
					],
				})
			: {},
	component: ProductPage,
});

function ProductPage() {
	const product = Route.useLoaderData();
	return (
		<section className="site-container page-section">
			<Breadcrumb title={product.name} />
			<div className="product-layout">
				<ProductGallery key={product.id} product={product} />
				<div className="min-w-0">
					<ProductSummary product={product} />
					<ProductInformation product={product} />
				</div>
			</div>
			<ProductPurchaseBar product={product} />
		</section>
	);
}
