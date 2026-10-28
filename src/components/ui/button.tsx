import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex h-auto shrink-0 items-center justify-center gap-3.5 whitespace-normal rounded-md border border-transparent text-[0.9375rem] font-medium shadow-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-[#592132]",
				destructive: "bg-destructive text-white",
				outline: "border-[#cebbc2] bg-transparent hover:bg-secondary",
				secondary: "bg-secondary",
				ghost: "bg-transparent hover:bg-secondary",
				link: "underline underline-offset-4",
			},
			size: {
				default: "min-h-12 px-6 py-3",
				xs: "min-h-7 px-2 py-1 text-xs",
				sm: "min-h-9 px-3 py-2",
				lg: "min-h-[52px] px-7 py-3.5",
				icon: "size-9 min-h-9 gap-0 p-0",
				"icon-xs": "size-6 min-h-6 gap-0 p-0",
				"icon-sm": "size-8 min-h-8 gap-0 p-0",
				"icon-lg": "size-11 min-h-11 gap-0 p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant = "default",
	size = "default",
	asChild = false,
	type,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot.Root : "button";

	return (
		<Comp
			type={asChild ? undefined : (type ?? "button")}
			data-slot="button"
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
