import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/utils.ts";

type SelectProps = ComponentProps<typeof SelectPrimitive.Root> & {
	id?: string;
	className?: string;
	placeholder?: string;
	"aria-label"?: string;
};

export function Select({
	children,
	id,
	className,
	placeholder,
	"aria-label": label,
	...props
}: SelectProps) {
	return (
		<SelectPrimitive.Root {...props}>
			<SelectPrimitive.Trigger
				id={id}
				aria-label={label}
				data-slot="select-trigger"
				className={cn(
					"flex min-h-10 w-full min-w-0 items-center justify-between gap-3 rounded-lg border border-input bg-background px-3 py-2.5 text-left text-sm shadow-xs outline-none transition-colors hover:border-ring/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span:first-child]:truncate",
					className,
				)}
			>
				<SelectPrimitive.Value placeholder={placeholder} />
				<SelectPrimitive.Icon asChild>
					<ChevronDown size={16} className="shrink-0 text-muted-foreground" />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>
			<SelectPrimitive.Portal>
				<SelectPrimitive.Content
					position="popper"
					sideOffset={6}
					collisionPadding={12}
					className="z-[100] max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-24px)] overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
				>
					<SelectPrimitive.ScrollUpButton className="flex justify-center py-1">
						<ChevronUp size={16} />
					</SelectPrimitive.ScrollUpButton>
					<SelectPrimitive.Viewport className="p-1.5">
						{children}
					</SelectPrimitive.Viewport>
					<SelectPrimitive.ScrollDownButton className="flex justify-center py-1">
						<ChevronDown size={16} />
					</SelectPrimitive.ScrollDownButton>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	);
}

export function SelectItem({
	children,
	className,
	...props
}: ComponentProps<typeof SelectPrimitive.Item> & { children: ReactNode }) {
	return (
		<SelectPrimitive.Item
			{...props}
			className={cn(
				"relative flex min-h-10 cursor-default items-center rounded-md py-2 pr-9 pl-3 text-sm outline-none select-none data-[highlighted]:bg-muted data-[highlighted]:text-primary data-[state=checked]:font-medium data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
				className,
			)}
		>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator className="absolute right-3 inline-flex">
				<Check size={15} />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	);
}
