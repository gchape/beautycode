import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Popover } from "radix-ui";
import { useEffect, useId, useState } from "react";
import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";
import { Label } from "../ui/label.tsx";

export function CatalogPriceFilter({
	value,
	onChange,
}: {
	value?: number;
	onChange: (value?: number) => void;
}) {
	const [open, setOpen] = useState(false);
	const [draft, setDraft] = useState(String(value ?? ""));
	const id = useId();
	useEffect(() => setDraft(String(value ?? "")), [value]);
	return (
		<Popover.Root
			open={open}
			onOpenChange={(nextOpen) => {
				if (nextOpen) setDraft(String(value ?? ""));
				setOpen(nextOpen);
			}}
		>
			<Popover.Trigger asChild>
				<Button
					variant="ghost"
					className="min-h-11 gap-1.5 rounded-lg border-input bg-background px-2.5 py-1 text-caption sm:min-h-9 sm:ml-auto data-[state=open]:bg-secondary/60"
				>
					<SlidersHorizontal size={15} aria-hidden="true" />
					<span>ფასი{value !== undefined ? ` · ${value} ₾` : ""}</span>
					<ChevronDown
						size={15}
						className="ui-chevron"
						data-open={open}
						aria-hidden="true"
					/>
				</Button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					data-slot="popover-content"
					align="end"
					sideOffset={8}
					collisionPadding={16}
					className="z-40 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-border bg-background p-5 shadow-lg"
					aria-label="ფასის ფილტრი"
				>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							onChange(draft === "" ? undefined : Number(draft));
							setOpen(false);
						}}
					>
						<Label htmlFor={id} className="mb-2 text-sm">
							მაქს. ფასი (₾)
						</Label>
						<Input
							id={id}
							type="number"
							inputMode="decimal"
							min="0"
							step="0.01"
							value={draft}
							onChange={(event) => setDraft(event.target.value)}
							className="tabular-nums"
						/>
						<div className="mt-4 flex items-center justify-between gap-2">
							<Button
								variant="ghost"
								className="min-h-11 px-3 py-2 text-sm"
								onClick={() => {
									setDraft("");
									onChange(undefined);
									setOpen(false);
								}}
							>
								გასუფთავება
							</Button>
							<Button type="submit" className="min-h-11 px-4 py-2 text-sm">
								გამოყენება
							</Button>
						</div>
					</form>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
