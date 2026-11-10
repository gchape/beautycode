import type { ProductStatus } from "../../data/labels.ts";
import { statusLabels } from "../../data/labels.ts";
import { Badge } from "../ui/badge.tsx";

const colors = {
	published: "bg-emerald-50 text-emerald-800 ring-emerald-200",
	draft: "bg-amber-50 text-amber-800 ring-amber-200",
	archived: "bg-slate-100 text-slate-600 ring-slate-200",
};
export function ProductStatusBadge({ status }: { status: ProductStatus }) {
	return (
		<Badge
			variant="outline"
			className={`max-w-full gap-1.5 border-0 px-2.5 py-1 text-[0.8125rem] font-normal whitespace-normal ring-1 ring-inset ${colors[status]}`}
		>
			<span className="size-1.5 shrink-0 rounded-full bg-current" />
			{statusLabels[status]}
		</Badge>
	);
}
