import type { ProductStatus } from "../../data/labels.ts";
import { statusLabels } from "../../data/labels.ts";

const colors = {
	published: "bg-emerald-50 text-emerald-800 ring-emerald-200",
	draft: "bg-amber-50 text-amber-800 ring-amber-200",
	archived: "bg-slate-100 text-slate-600 ring-slate-200",
};
export function ProductStatusBadge({ status }: { status: ProductStatus }) {
	return (
		<span
			className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs whitespace-nowrap ring-1 ring-inset ${colors[status]}`}
		>
			<span className="size-1.5 rounded-full bg-current" />
			{statusLabels[status]}
		</span>
	);
}
