import type * as React from "react";
import { cn } from "@/lib/utils";

import { formControlVariants } from "./form-control.ts";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				formControlVariants(),
				"flex min-h-24 resize-y sm:min-h-24",
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
