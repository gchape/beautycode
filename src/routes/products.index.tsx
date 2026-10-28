import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Breadcrumb } from "../components/breadcrumb.tsx";
import { CatalogFilters } from "../components/catalog/catalog-filters.tsx";
import { CatalogSearchForm } from "../components/catalog/catalog-search-form.tsx";
import { ProductGrid } from "../components/catalog/product-grid.tsx";
import { Button } from "../components/ui/button.tsx";
import { Card } from "../components/ui/card.tsx";
import {
	type CatalogSearch,
	catalogSearchSchema,
	filterProducts,
} from "../lib/catalog-search.ts";
import { seoHead } from "../lib/seo.ts";
import { getProducts } from "../server/catalog.ts";
export const Route = createFileRoute("/products/")({
	validateSearch: catalogSearchSchema,
	loaderDeps: ({ search }) => ({ q: search.q }),
	loader: ({ deps }) => getProducts({ data: { query: deps.q } }),
	head: ({ match }) =>
		seoHead({
			title: "ყველა პროდუქტი",
			description:
				"აღმოაჩინე Beauty Code-ის პროდუქტები. შეარჩიე კატეგორიით, ფასითა და ფასდაკლებით.",
			path: "/products",
			noindex: Object.values(match.search).some((value) => value !== undefined),
		}),
	component: Catalog,
});

function Catalog() {
	const allProducts = Route.useLoaderData();
	const search = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const update = (values: Partial<CatalogSearch>) =>
		navigate({ search: (previous) => ({ ...previous, ...values }) });
	// Full-text search runs in SQLite; remaining filters sort/refine these results locally.
	const products = filterProducts(allProducts, search);
	const hasFilters = Boolean(
		search.q || search.category || search.discount || search.max !== undefined,
	);
	return (
		<section className="mx-auto w-[min(1240px,calc(100%-80px))] max-[1100px]:w-[calc(100%-48px)] max-[560px]:w-[calc(100%-32px)] min-h-[60vh] pt-[25px] pb-20 [&>h1]:mt-4 [&>h1]:mb-6 [&>h1]:text-4xl max-[560px]:[&>h1]:text-3xl">
			<Breadcrumb title="ყველა პროდუქტი" />
			<span className="block text-[0.8125rem] font-medium tracking-[0.13em] max-[560px]:text-xs">
				იპოვე შენი სილამაზის კოდი
			</span>
			<h1>ყველა პროდუქტი</h1>
			<CatalogSearchForm
				key={search.q || ""}
				defaultValue={search.q || ""}
				onSearch={(q) => {
					void update({ q });
				}}
			/>
			<CatalogFilters search={search} onChange={update} />
			<div className="my-[30px] flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
				<span>{products.length} პროდუქტი</span>
				<Button
					className="min-h-0 bg-transparent p-0 text-[length:inherit] underline hover:bg-transparent"
					variant="ghost"
					onClick={() => {
						void navigate({ search: {} });
					}}
				>
					ფილტრების გასუფთავება
				</Button>
			</div>
			{!products.length && hasFilters ? (
				<Card className="block rounded-lg border border-border bg-[#faf6f6] px-[22px] py-[55px] text-center shadow-none [&>svg]:mx-auto [&>svg]:mb-5 [&>svg]:text-[#a77a8a] [&_h2]:text-[1.375rem] [&_p]:text-[0.9375rem] [&_p]:text-muted-foreground max-[560px]:px-[18px] max-[560px]:py-10 max-[560px]:[&_h2]:text-[1.1875rem]">
					<Search size={32} />
					<h2>პროდუქტი ვერ მოიძებნა</h2>
					<p>სცადე სხვა სიტყვა ან შეცვალე ფილტრები.</p>
				</Card>
			) : (
				<ProductGrid products={products} />
			)}
		</section>
	);
}
