import { Archive, CheckCircle2, FilePenLine, Package } from "lucide-react";
import type { AdminProduct } from "../../data/catalog.ts";

export function CatalogOverview({
	products,
	pending,
}: {
	products: AdminProduct[];
	pending: boolean;
}) {
	const metrics = [
		{ label: "ყველა პროდუქტი", count: products.length, icon: Package },
		{
			label: "გამოქვეყნებული",
			count: products.filter((p) => p.status === "published").length,
			icon: CheckCircle2,
		},
		{
			label: "მონახაზი",
			count: products.filter((p) => p.status === "draft").length,
			icon: FilePenLine,
		},
		{
			label: "არქივი",
			count: products.filter((p) => p.status === "archived").length,
			icon: Archive,
		},
	];
	return (
		<dl className="my-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
			{metrics.map(({ label, count, icon: Icon }) => (
				<div
					key={label}
					className="rounded-xl border border-border bg-white p-4 sm:p-5"
				>
					<dt className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
						<span>{label}</span>
						<Icon size={17} aria-hidden="true" />
					</dt>
					<dd className="mt-3 text-3xl font-semibold tabular-nums">
						{pending ? "—" : count}
					</dd>
				</div>
			))}
		</dl>
	);
}
