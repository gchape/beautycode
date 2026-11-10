import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useTransition } from "react";
import { Breadcrumb } from "../components/breadcrumb.tsx";
import { CatalogFilters } from "../components/catalog/catalog-filters.tsx";
import { CatalogSearchForm } from "../components/catalog/catalog-search-form.tsx";
import { ProductGrid } from "../components/catalog/product-grid.tsx";
import { Button } from "../components/ui/button.tsx";
import { Card } from "../components/ui/card.tsx";
import { productsQuery } from "../lib/catalog-queries.ts";
import {
	type CatalogSearch,
	catalogSearchSchema,
	filterProducts,
} from "../lib/catalog-search.ts";
import { seoHead } from "../lib/seo.ts";

export const Route = createFileRoute("/products/")({
	validateSearch: catalogSearchSchema,
	loaderDeps: ({ search }) => ({ q: search.q }),
	loader: ({ deps, context }) =>
		context.queryClient.fetchQuery(productsQuery(deps.q)),
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
	const [pending, startTransition] = useTransition();
	const update = (values: Partial<CatalogSearch>) =>
		startTransition(async () => {
			await navigate({
				search: (previous) => ({ ...previous, ...values }),
				resetScroll: false,
			});
		});
	const clear = () =>
		startTransition(async () => {
			await navigate({ search: {}, resetScroll: false });
		});
	const products = useMemo(
		() => filterProducts(allProducts, search),
		[allProducts, search],
	);
	const hasFilters = Boolean(
		search.q || search.category || search.discount || search.max !== undefined,
	);
	return (
		<section className="site-container page-section">
			<Breadcrumb title="ყველა პროდუქტი" />
			<h1>ყველა პროდუქტი</h1>
			<CatalogSearchForm
				key={search.q || ""}
				defaultValue={search.q || ""}
				pending={pending}
				onSearch={(q) => {
					void update({ q });
				}}
			/>
			<CatalogFilters search={search} onChange={update} />
			<div className="my-7.5 flex min-h-11 flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
				<span role="status" aria-live="polite">
					{pending ? "პროდუქტები იტვირთება…" : `${products.length} პროდუქტი`}
				</span>
				{(hasFilters || search.sort) && (
					<Button
						className="min-h-11 bg-transparent px-2 text-[length:inherit] underline hover:bg-transparent"
						variant="ghost"
						onClick={clear}
					>
						ფილტრების გასუფთავება
					</Button>
				)}
			</div>
			{!products.length && hasFilters ? (
				<Card variant="empty">
					<Search size={32} />
					<h2>პროდუქტი ვერ მოიძებნა</h2>
					<p>სცადე სხვა სიტყვა ან შეცვალე ფილტრები.</p>
					<Button variant="outline" onClick={clear}>
						ფილტრების გასუფთავება
					</Button>
				</Card>
			) : (
				<div aria-busy={pending} className={pending ? "opacity-60" : undefined}>
					<h2 className="sr-only">პროდუქტების სია</h2>
					<ProductGrid products={products} />
				</div>
			)}
		</section>
	);
}
