import type { AdminProduct } from "../../data/catalog.ts";

export function CatalogOverview({
	products,
	pending,
}: {
	products: AdminProduct[];
	pending: boolean;
}) {
	const metrics = [
		["პროდუქტები", products.length],
		["საიტზე", products.filter((p) => p.status === "published").length],
		["მონახაზი", products.filter((p) => p.status === "draft").length],
		[
			"მთავარ გვერდზე",
			products.filter((p) => p.status === "published" && p.is_featured).length,
		],
	] as const;
	return (
		<dl className="my-4 grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl bg-muted px-4 py-3 sm:grid-cols-4">
			{metrics.map(([label, count]) => (
				<div key={label} className="flex items-baseline justify-between gap-3">
					<dt className="text-sm text-muted-foreground">{label}</dt>
					<dd className="m-0 text-subheading font-semibold tabular-nums">
						{pending ? "…" : count}
					</dd>
				</div>
			))}
		</dl>
	);
}
