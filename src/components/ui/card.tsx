import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

const cardVariants = cva(
	"flex flex-col gap-6 rounded-xl border border-border bg-card py-6 text-card-foreground shadow-sm",
	{
		variants: {
			variant: {
				default: "",
				empty:
					"block rounded-lg border border-border bg-[#faf6f6] px-5.5 py-13.75 text-center shadow-none [&>svg]:mx-auto [&>svg]:mb-5 [&>svg]:text-[#a77a8a] [&_h2]:text-[1.375rem] [&_p]:text-[0.9375rem] [&_p]:text-muted-foreground max-[560px]:px-4.5 max-[560px]:py-10 max-[560px]:[&_h2]:text-[1.1875rem]",
			},
		},
		defaultVariants: { variant: "default" },
	},
);

function Card({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof cardVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot.Root : "div";
	return (
		<Comp
			data-slot="card"
			className={cn(cardVariants({ variant }), className)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn("leading-none font-semibold", className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-6", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
};
