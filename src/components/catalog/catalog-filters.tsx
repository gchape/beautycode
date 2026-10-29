import type { CatalogSearch } from "../../lib/catalog-search.ts";
import { useCategories } from "../catalog/category-context.tsx";
import { Checkbox } from "../ui/checkbox.tsx";
import { Input } from "../ui/input.tsx";
import { Label } from "../ui/label.tsx";
import { Select, SelectItem } from "../ui/select.tsx";

export function CatalogFilters({
	search,
	onChange,
}: {
	search: CatalogSearch;
	onChange: (values: Partial<CatalogSearch>) => void;
}) {
	const categories = useCategories();
	return (
		<div className="flex flex-wrap items-end gap-5 max-[560px]:grid max-[560px]:grid-cols-2 max-[560px]:gap-x-3 max-[560px]:gap-y-4.5">
			<Label
				className="flex flex-col items-stretch gap-2.25 text-sm font-normal"
				htmlFor="category"
			>
				კატეგორია
				<Select
					className="h-auto min-h-10.5 max-w-50 rounded-[5px] border border-input bg-background px-3 py-2 text-[length:inherit] text-foreground shadow-none max-[560px]:w-full max-[560px]:min-w-0 max-[560px]:max-w-none max-[560px]:text-sm pr-9"
					id="category"
					value={search.category || "all"}
					onValueChange={(value) =>
						void onChange({ category: value === "all" ? undefined : value })
					}
				>
					<SelectItem value="all">ყველა კატეგორია</SelectItem>
					{categories.map((c) => (
						<SelectItem key={c.slug} value={c.slug}>
							{c.name}
						</SelectItem>
					))}
				</Select>
			</Label>
			<Label
				className="flex flex-col items-stretch gap-2.25 text-sm font-normal"
				htmlFor="max-price"
			>
				მაქს. ფასი (₾)
				<Input
					className="h-auto min-h-10.5 max-w-50 rounded-[5px] border border-input bg-background px-3 py-2 text-[length:inherit] text-foreground shadow-none max-[560px]:w-full max-[560px]:min-w-0 max-[560px]:max-w-none max-[560px]:text-sm md:text-[length:inherit]"
					id="max-price"
					type="number"
					min="0"
					value={search.max ?? ""}
					onChange={(e) =>
						void onChange({
							max: e.target.value === "" ? undefined : Number(e.target.value),
						})
					}
				/>
			</Label>
			<Label
				className="flex flex-col items-stretch gap-2.25 text-sm font-normal"
				htmlFor="sort"
			>
				დალაგება
				<Select
					className="h-auto min-h-10.5 max-w-50 rounded-[5px] border border-input bg-background px-3 py-2 text-[length:inherit] text-foreground shadow-none max-[560px]:w-full max-[560px]:min-w-0 max-[560px]:max-w-none max-[560px]:text-sm pr-9"
					id="sort"
					value={search.sort || "newest"}
					onValueChange={(value) =>
						void onChange({
							sort: value as "newest" | "price-asc" | "price-desc",
						})
					}
				>
					<SelectItem value="newest">ახალი დამატებული</SelectItem>
					<SelectItem value="price-asc">ფასი: ზრდადობით</SelectItem>
					<SelectItem value="price-desc">ფასი: კლებადობით</SelectItem>
				</Select>
			</Label>
			<Label
				htmlFor="discount"
				className="flex gap-2.25 text-sm font-normal min-h-10.5 flex-row items-center self-end max-[560px]:text-[0.8125rem]"
			>
				<Checkbox
					className="size-4 border border-input data-[state=checked]:border-primary"
					id="discount"
					checked={search.discount || false}
					onCheckedChange={(checked) =>
						void onChange({ discount: checked === true || undefined })
					}
				/>
				მხოლოდ ფასდაკლებით
			</Label>
		</div>
	);
}
