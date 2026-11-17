import type { ComponentProps } from "react";
import { cn } from "../../lib/utils.ts";

import { type FormControlProps, formControlVariants } from "./form-control.ts";

export function Select({
	className,
	density,
	...props
}: ComponentProps<"select"> & FormControlProps) {
	return (
		<select
			data-slot="select"
			className={cn(formControlVariants({ density }), className)}
			{...props}
		/>
	);
}
