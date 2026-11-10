import type { ReactNode } from "react";
import { Card } from "../ui/card.tsx";

export function AdminTable({ children }: { children: ReactNode }) {
	return (
		<Card className="gap-0 overflow-hidden py-0 shadow-none [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_td]:min-w-0 [&_td]:align-middle [&_thead]:bg-muted/60 [&_th]:px-5 [&_th]:py-4 [&_th]:text-left [&_th]:font-medium [&_th]:text-muted-foreground [&_td]:px-4 [&_td]:py-3 lg:[&_td]:px-5 lg:[&_td]:py-4 [&_tbody_tr]:border-t [&_tbody_tr]:border-border/60 [&_tbody_tr:hover]:bg-muted/30 max-lg:[&_thead]:sr-only max-lg:[&_tbody]:block max-lg:[&_tbody_tr]:grid max-lg:[&_tbody_tr]:grid-cols-[minmax(0,1fr)_auto] max-lg:[&_tbody_tr]:py-2 max-lg:[&_td:first-child]:col-span-full max-lg:[&_td:last-child]:col-span-full max-lg:[&_td:last-child]:text-left">
			{children}
		</Card>
	);
}
