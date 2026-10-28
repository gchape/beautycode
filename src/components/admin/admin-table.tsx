import type { ReactNode } from "react";

export function AdminTable({ children }: { children: ReactNode }) {
	return (
		<div className="overflow-x-auto rounded-xl border border-border bg-white [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_thead]:bg-muted/60 [&_th]:px-5 [&_th]:py-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-medium [&_th]:whitespace-nowrap [&_th]:text-muted-foreground [&_td]:px-5 [&_td]:py-4 [&_tbody_tr]:border-t [&_tbody_tr]:border-border/60 [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-muted/30">
			{children}
		</div>
	);
}
