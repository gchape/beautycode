import { XIcon } from "lucide-react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { Dialog as SheetPrimitive } from "radix-ui";
import type * as React from "react";
import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const SheetContext = createContext(false);

function Sheet({
	open,
	defaultOpen = false,
	onOpenChange,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Root>) {
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const isOpen = open ?? internalOpen;
	return (
		<SheetContext value={isOpen}>
			<SheetPrimitive.Root
				data-slot="sheet"
				{...props}
				open={isOpen}
				onOpenChange={(value) => {
					setInternalOpen(value);
					onOpenChange?.(value);
				}}
			/>
		</SheetContext>
	);
}

function SheetTrigger({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
	return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
	const reducedMotion = useReducedMotion();
	return (
		<SheetPrimitive.Overlay data-slot="sheet-overlay" {...props} asChild>
			<m.div
				className={cn("fixed inset-0 z-50 bg-[#2e00034d]", className)}
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: { duration: reducedMotion ? 0 : 0.12, ease: "easeOut" },
				}}
				exit={{
					opacity: 0,
					transition: { duration: reducedMotion ? 0 : 0.1, ease: "easeIn" },
				}}
			/>
		</SheetPrimitive.Overlay>
	);
}

function SheetContent({
	className,
	children,
	side = "right",
	showCloseButton = true,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
	side?: "top" | "right" | "bottom" | "left";
	showCloseButton?: boolean;
}) {
	const open = useContext(SheetContext);
	const reducedMotion = useReducedMotion();
	return (
		<SheetPortal forceMount>
			<AnimatePresence initial={false}>
				{open && <SheetOverlay key="overlay" forceMount />}
				{open && (
					<SheetPrimitive.Content
						key="content"
						forceMount
						asChild
						data-slot="sheet-content"
						className={cn(
							"fixed z-50 flex flex-col gap-4 bg-background shadow-lg",
							side === "right" &&
								"inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
							side === "left" &&
								"inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
							side === "top" && "inset-x-0 top-0 h-auto border-b",
							side === "bottom" && "inset-x-0 bottom-0 h-auto border-t",
							className,
						)}
						{...props}
					>
						<m.div
							initial={{ opacity: 0 }}
							animate={{
								opacity: 1,
								transition: {
									duration: reducedMotion ? 0 : 0.12,
									ease: "easeOut",
								},
							}}
							exit={{
								opacity: 0,
								transition: {
									duration: reducedMotion ? 0 : 0.1,
									ease: "easeIn",
								},
							}}
						>
							{children}
							{showCloseButton && (
								<SheetPrimitive.Close
									data-slot="sheet-close"
									className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-muted ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary"
								>
									<XIcon className="size-4" />
									<span className="sr-only">დახურვა</span>
								</SheetPrimitive.Close>
							)}
						</m.div>
					</SheetPrimitive.Content>
				)}
			</AnimatePresence>
		</SheetPortal>
	);
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-header"
			className={cn("flex flex-col gap-1.5 p-4", className)}
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn("mt-auto flex flex-col gap-2 p-4", className)}
			{...props}
		/>
	);
}

function SheetTitle({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn("font-semibold text-foreground", className)}
			{...props}
		/>
	);
}

function SheetDescription({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}

export {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
};
