import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Breadcrumb } from "../components/breadcrumb";
import { CatalogFilters } from "../components/catalog/catalog-filters";
import { CatalogSearchForm } from "../components/catalog/catalog-search-form";
import { ProductGrid } from "../components/catalog/product-grid";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
	type CatalogSearch,
	catalogSearchSchema,
	filterProducts,
} from "../lib/catalog-search";
import { seoHead } from "../lib/seo";
import { getProducts } from "../server/catalog";
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
	const [query, setQuery] = useState(search.q || "");
	useEffect(() => setQuery(search.q || ""), [search.q]);
	const navigate = useNavigate({ from: Route.fullPath });
	const update = (values: Partial<CatalogSearch>) =>
		navigate({ search: (previous) => ({ ...previous, ...values }) });
	const products = filterProducts(allProducts, search);
	return (
		<section className="wrap page-section">
			<Breadcrumb title="ყველა პროდუქტი" />
			<span className="eyebrow">იპოვე შენი სილამაზის კოდი</span>
			<h1>ყველა პროდუქტი</h1>
			<CatalogSearchForm
				query={query}
				onQueryChange={setQuery}
				onSearch={(q) => {
					void update({ q });
				}}
			/>
			<CatalogFilters search={search} onChange={update} />
			<div className="results-count">
				<span>{products.length} პროდუქტი</span>
				<Button
					variant="ghost"
					onClick={() => {
						setQuery("");
						void navigate({ search: {} });
					}}
				>
					ფილტრების გასუფთავება
				</Button>
			</div>
			{!products.length &&
			(search.q ||
				search.category ||
				search.discount ||
				search.max !== undefined) ? (
				<Card className="empty-state">
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
