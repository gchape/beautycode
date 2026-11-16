"use client";

import { ChevronDownIcon } from "lucide-react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { Accordion as AccordionPrimitive } from "radix-ui";
import type * as React from "react";
import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const AccordionContext = createContext<string[]>([]);
const AccordionItemContext = createContext(false);

function Accordion(
	props: React.ComponentProps<typeof AccordionPrimitive.Root>,
) {
	const [value, setValue] = useState<string | string[]>(
		props.defaultValue ?? (props.type === "multiple" ? [] : ""),
	);
	const current = props.value ?? value;
	return (
		<AccordionContext value={Array.isArray(current) ? current : [current]}>
			<AccordionPrimitive.Root
				data-slot="accordion"
				{...props}
				onValueChange={(next: string | string[]) => {
					setValue(next);
					if (props.type === "multiple" && Array.isArray(next))
						props.onValueChange?.(next);
					if (props.type === "single" && typeof next === "string")
						props.onValueChange?.(next);
				}}
			/>
		</AccordionContext>
	);
}

function AccordionItem({
	className,
	value,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
	const selected = useContext(AccordionContext);
	return (
		<AccordionItemContext value={selected.includes(value)}>
			<AccordionPrimitive.Item
				data-slot="accordion-item"
				value={value}
				className={cn("border-b last:border-b-0", className)}
				{...props}
			/>
		</AccordionItemContext>
	);
}

function AccordionTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
	const open = useContext(AccordionItemContext);
	return (
		<AccordionPrimitive.Header className="m-0 flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
					className,
				)}
				{...props}
			>
				{children}
				<m.span
					className="pointer-events-none mt-0.5 shrink-0 text-muted-foreground"
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: 0.18 }}
					aria-hidden="true"
				>
					<ChevronDownIcon className="size-4" />
				</m.span>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
	const open = useContext(AccordionItemContext);
	const reducedMotion = useReducedMotion();
	return (
		<AnimatePresence initial={false}>
			{open && (
				<AccordionPrimitive.Content
					key="content"
					forceMount
					asChild
					data-slot="accordion-content"
					{...props}
				>
					<m.div
						className="overflow-hidden text-sm"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: reducedMotion ? 0 : 0.22 }}
					>
						<div className={cn("pt-0 pb-4", className)}>{children}</div>
					</m.div>
				</AccordionPrimitive.Content>
			)}
		</AnimatePresence>
	);
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
