import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, LayoutGroup, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useId, useState } from "react";
import type { CatalogSearch } from "../../lib/catalog-search.ts";
import { cinematicEase } from "../../lib/motion.ts";
import { useCategories } from "../catalog/category-context.tsx";
import { Button } from "../ui/button.tsx";
import { Checkbox } from "../ui/checkbox.tsx";
import { Input } from "../ui/input.tsx";
import { Label } from "../ui/label.tsx";
import { Select } from "../ui/select.tsx";

export function CatalogFilters({
	search,
	onChange,
}: {
	search: CatalogSearch;
	onChange: (values: Partial<CatalogSearch>) => void;
}) {
	const categories = useCategories();
	const [max, setMax] = useState(String(search.max ?? ""));
	const [priceOpen, setPriceOpen] = useState(search.max !== undefined);
	const id = useId();
	const reducedMotion = useReducedMotion();
	useEffect(() => setMax(String(search.max ?? "")), [search.max]);

	return (
		<div className="min-w-0 rounded-3xl border border-[#dfcbd3] bg-linear-to-br from-white to-[#f7edf1] p-3 shadow-[0_4px_16px_#63303e0d,inset_0_1px_0_#ffffff] sm:px-4">
			<LayoutGroup id={id}>
				<nav
					aria-label="ფილტრი კატეგორიით"
					className="filter-categories flex gap-2 overflow-x-auto px-0.5 py-1"
				>
					{[{ slug: "", name: "ყველა" }, ...categories].map((category) => {
						const selected = (search.category ?? "") === category.slug;
						return (
							<m.button
								key={category.slug}
								type="button"
								aria-pressed={selected}
								onClick={() =>
									onChange({ category: category.slug || undefined })
								}
								whileTap={{ scale: 0.98 }}
								className={`relative isolate min-h-11 shrink-0 rounded-full border px-3 py-1.5 text-[0.8125rem] font-medium ${selected ? "border-[#63303e] text-primary-foreground shadow-[0_2px_6px_#2e00031a]" : "border-[#dfcbd3] bg-white/80 shadow-[0_1px_3px_#63303e08] hover:border-[#b8889b] hover:bg-white"}`}
							>
								{selected && (
									<m.span
										layoutId="selected-category"
										className="absolute inset-0 -z-10 rounded-full bg-linear-to-br from-[#63303e] to-primary"
										transition={{
											duration: reducedMotion ? 0 : 0.25,
											ease: cinematicEase,
										}}
										aria-hidden="true"
									/>
								)}
								{category.name}
							</m.button>
						);
					})}
				</nav>
			</LayoutGroup>
			<div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-t border-border/60 pt-2 sm:flex sm:flex-wrap sm:gap-x-4">
				<Label
					htmlFor="sort"
					className="col-span-full flex min-w-0 items-center gap-2 text-[0.8125rem] font-normal text-muted-foreground [&>span]:shrink-0"
				>
					<span>დალაგება</span>
					<Select
						id="sort"
						className="min-h-11 min-w-0 flex-1 rounded-full border-[#dfcbd3] bg-white/80 px-3 py-1.5 text-sm text-foreground shadow-[inset_0_1px_3px_#63303e06] focus-visible:border-[#b8889b] focus-visible:ring-[#63303e14] sm:w-auto sm:max-w-52 sm:flex-none sm:text-sm"
						value={search.sort || "newest"}
						onChange={(event) =>
							onChange({ sort: event.target.value as CatalogSearch["sort"] })
						}
					>
						<option value="newest">ახალი დამატებული</option>
						<option value="price-asc">ფასი: ზრდადობით</option>
						<option value="price-desc">ფასი: კლებადობით</option>
					</Select>
				</Label>
				<Label
					htmlFor="discount"
					className="flex min-h-11 min-w-0 cursor-pointer items-center gap-2 rounded-full border border-[#dfcbd3] bg-white/70 px-3 py-1.5 text-[0.8125rem] leading-relaxed font-normal has-[[data-state=checked]]:border-[#b8889b] has-[[data-state=checked]]:bg-secondary/60"
				>
					<Checkbox
						id="discount"
						aria-label="მხოლოდ ფასდაკლებით"
						className="size-4.5 shrink-0 border-input data-[state=checked]:border-primary"
						checked={search.discount || false}
						onCheckedChange={(checked) =>
							onChange({ discount: checked === true || undefined })
						}
					/>
					<span className="whitespace-nowrap">
						<span className="hidden sm:inline">მხოლოდ </span>ფასდაკლებით
					</span>
				</Label>
				<Button
					variant="ghost"
					aria-expanded={priceOpen}
					aria-controls={`${id}-price`}
					onClick={() => setPriceOpen((open) => !open)}
					className="min-h-11 gap-1.5 rounded-full border-[#dfcbd3] bg-white/70 px-3 py-1.5 text-[0.8125rem] shadow-[0_1px_3px_#63303e08] aria-expanded:border-[#b8889b] aria-expanded:bg-secondary/60 sm:ml-auto"
				>
					<SlidersHorizontal size={15} aria-hidden="true" />
					<span className="max-[360px]:sr-only">
						ფასი{search.max !== undefined ? ` · ${search.max} ₾` : ""}
					</span>
					<m.span
						animate={{ rotate: priceOpen ? 180 : 0 }}
						transition={{ duration: 0.18 }}
						aria-hidden="true"
					>
						<ChevronDown size={15} />
					</m.span>
				</Button>
			</div>
			<AnimatePresence initial={false}>
				{priceOpen && (
					<m.div
						key="price"
						id={`${id}-price`}
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{
							duration: reducedMotion ? 0 : 0.2,
							ease: cinematicEase,
						}}
						className="overflow-hidden"
					>
						<form
							className="mt-2 flex flex-wrap items-end gap-2 border-t border-border/60 pt-3"
							onSubmit={(event) => {
								event.preventDefault();
								onChange({ max: max === "" ? undefined : Number(max) });
							}}
						>
							<Label
								htmlFor="max-price"
								className="flex min-w-0 flex-1 flex-col gap-1.5 text-xs font-normal text-muted-foreground sm:max-w-48"
							>
								მაქს. ფასი (₾)
								<Input
									id="max-price"
									type="number"
									inputMode="decimal"
									min="0"
									step="0.01"
									value={max}
									onChange={(event) => setMax(event.target.value)}
									className="min-h-11 rounded-full border-[#dfcbd3] bg-white/80 px-4 py-1.5 text-sm text-foreground shadow-[inset_0_1px_3px_#63303e06] focus-visible:border-[#b8889b] focus-visible:ring-[#63303e14]"
								/>
							</Label>
							<Button
								type="submit"
								className="min-h-11 rounded-full border-white/15 bg-linear-to-br from-[#63303e] to-primary px-4 py-2 text-sm shadow-[0_2px_6px_#2e000326,inset_0_1px_0_#ffffff26] hover:from-[#754052] hover:to-[#481421]"
							>
								გამოყენება
							</Button>
						</form>
					</m.div>
				)}
			</AnimatePresence>
		</div>
	);
}
