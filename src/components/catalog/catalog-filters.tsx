import { useId } from "react";
import type { CatalogSearch } from "../../lib/catalog-search.ts";
import { useCategories } from "../catalog/category-context.tsx";
import { Checkbox } from "../ui/checkbox.tsx";
import { Label } from "../ui/label.tsx";
import { Select } from "../ui/select.tsx";
import { CatalogPriceFilter } from "./catalog-price-filter.tsx";

export function CatalogFilters({
	search,
	onChange,
}: {
	search: CatalogSearch;
	onChange: (values: Partial<CatalogSearch>) => void;
}) {
	const categories = useCategories();
	const id = useId();

	return (
		<div className="catalog-toolbar min-w-0 px-3 py-2 sm:px-4">
			<nav
				aria-label="ფილტრი კატეგორიით"
				className="filter-categories flex gap-2 overflow-x-auto px-0.5 py-1"
			>
				{[{ slug: "", name: "ყველა" }, ...categories].map((category) => {
					const selected = (search.category ?? "") === category.slug;
					return (
						<button
							key={category.slug}
							type="button"
							aria-pressed={selected}
							onClick={() => onChange({ category: category.slug || undefined })}
							className={`min-h-11 shrink-0 rounded-lg border px-3 py-1 text-caption font-medium sm:min-h-9 ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-input hover:bg-muted"}`}
						>
							{category.name}
						</button>
					);
				})}
			</nav>

			<div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-t border-border/60 pt-2 sm:flex sm:flex-wrap sm:gap-x-3">
				<Label
					htmlFor={`${id}-sort`}
					className="col-span-full flex min-w-0 items-center gap-2 text-caption font-normal text-muted-foreground [&>span]:shrink-0"
				>
					<span>დალაგება</span>
					<Select
						density="compact"
						id={`${id}-sort`}
						className="flex-1 px-2.5 sm:w-auto sm:max-w-52 sm:flex-none"
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
					htmlFor={`${id}-discount`}
					className="flex min-h-11 min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-input bg-background px-2.5 py-1 text-caption leading-relaxed font-normal sm:min-h-9 has-[[data-state=checked]]:border-[#b8889b] has-[[data-state=checked]]:bg-secondary/60"
				>
					<Checkbox
						id={`${id}-discount`}
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
				<CatalogPriceFilter
					value={search.max}
					onChange={(max) => onChange({ max })}
				/>
			</div>
		</div>
	);
}
