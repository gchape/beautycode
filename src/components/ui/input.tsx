import type * as React from "react";
import { cn } from "@/lib/utils";

import { type FormControlProps, formControlVariants } from "./form-control.ts";

function Input({
	className,
	type,
	density,
	...props
}: React.ComponentProps<"input"> & FormControlProps) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				formControlVariants({ density }),
				"selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
