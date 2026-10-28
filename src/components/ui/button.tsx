import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"button shrink-0 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "button-primary",
				destructive: "button-destructive",
				outline: "button-outline",
				secondary: "button-secondary",
				ghost: "button-ghost",
				link: "button-link",
			},
			size: {
				default: "",
				xs: "",
				sm: "",
				lg: "",
				icon: "",
				"icon-xs": "",
				"icon-sm": "",
				"icon-lg": "",
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
