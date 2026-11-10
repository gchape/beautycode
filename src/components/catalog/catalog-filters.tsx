import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { CatalogSearch } from "../../lib/catalog-search.ts";
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
	useEffect(() => setMax(String(search.max ?? "")), [search.max]);

	return (
		<div>
			<nav
				aria-label="ფილტრი კატეგორიით"
				className="flex gap-2 overflow-x-auto pb-3"
			>
				{[{ slug: "", name: "ყველა" }, ...categories].map((category) => {
					const selected = (search.category ?? "") === category.slug;
					return (
						<button
							key={category.slug}
							type="button"
							aria-pressed={selected}
							onClick={() => onChange({ category: category.slug || undefined })}
							className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-muted"}`}
						>
							{category.name}
						</button>
					);
				})}
			</nav>
			<div className="mt-1 grid grid-cols-2 items-end gap-3 sm:flex sm:flex-wrap sm:gap-5">
				<Label
					htmlFor="sort"
					className="flex min-w-0 flex-col items-stretch gap-2 text-sm font-normal sm:w-60"
				>
					დალაგება
					<Select
						id="sort"
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
					className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-normal leading-relaxed"
				>
					<Checkbox
						id="discount"
						className="size-5 shrink-0 border-input data-[state=checked]:border-primary"
						checked={search.discount || false}
						onCheckedChange={(checked) =>
							onChange({ discount: checked === true || undefined })
						}
					/>
					მხოლოდ ფასდაკლებით
				</Label>
			</div>
			<details
				className="group mt-3 rounded-lg border border-border bg-background"
				open={priceOpen}
				onToggle={(event) => setPriceOpen(event.currentTarget.open)}
			>
				<summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-2 text-sm [&::-webkit-details-marker]:hidden">
					<span>
						ფასის ფილტრი
						{search.max !== undefined ? ` · მაქს. ${search.max} ₾` : ""}
					</span>
					<ChevronDown
						size={17}
						className="shrink-0 transition-transform group-open:rotate-180"
						aria-hidden="true"
					/>
				</summary>
				<form
					className="flex flex-wrap items-end gap-3 border-t border-border p-4"
					onSubmit={(event) => {
						event.preventDefault();
						onChange({ max: max === "" ? undefined : Number(max) });
					}}
				>
					<Label
						htmlFor="max-price"
						className="flex min-w-0 flex-1 flex-col items-stretch gap-2 text-sm font-normal sm:max-w-60"
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
							className="bg-background text-base"
						/>
					</Label>
					<Button type="submit" className="min-h-11 px-4 text-sm">
						გამოყენება
					</Button>
				</form>
			</details>
		</div>
	);
}
