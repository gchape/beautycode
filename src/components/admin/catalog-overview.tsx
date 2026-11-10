import type { AdminProduct } from "../../data/catalog.ts";
import { Card } from "../ui/card.tsx";

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
		<Card
			asChild
			className="my-6 grid grid-cols-2 gap-5 p-4 shadow-none sm:grid-cols-4 sm:p-5"
		>
			<dl>
				{metrics.map(([label, count]) => (
					<div key={label}>
						<dt className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
							{label}
						</dt>
						<dd className="mt-1 text-2xl font-semibold tabular-nums">
							{pending ? "…" : count}
						</dd>
					</div>
				))}
			</dl>
		</Card>
	);
}
