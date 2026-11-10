import type { ComponentProps } from "react";
import { cn } from "../../lib/utils.ts";

export function Select({ className, ...props }: ComponentProps<"select">) {
	return (
		<select
			data-slot="select"
			className={cn(
				"min-h-11 w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-base text-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
				className,
			)}
			{...props}
		/>
	);
}
