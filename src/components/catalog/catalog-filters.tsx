import type { CatalogSearch } from "../../lib/catalog-search.ts";
import { useCategories } from "../catalog/category-context.tsx";
import { Checkbox } from "../ui/checkbox.tsx";
import { Input } from "../ui/input.tsx";
import { Label } from "../ui/label.tsx";
import { NativeSelect, NativeSelectOption } from "../ui/native-select.tsx";

export function CatalogFilters({
	search,
	onChange,
}: {
	search: CatalogSearch;
	onChange: (values: Partial<CatalogSearch>) => void;
}) {
	const categories = useCategories();
	return (
		<div className="filters">
			<Label htmlFor="category">
				კატეგორია
				<NativeSelect
					id="category"
					value={search.category || ""}
					onChange={(e) =>
						void onChange({ category: e.target.value || undefined })
					}
				>
					<NativeSelectOption value="">ყველა კატეგორია</NativeSelectOption>
					{categories.map((c) => (
						<NativeSelectOption key={c.slug} value={c.slug}>
							{c.name}
						</NativeSelectOption>
					))}
				</NativeSelect>
			</Label>
			<Label htmlFor="max-price">
				მაქს. ფასი (₾)
				<Input
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
			<Label htmlFor="sort">
				დალაგება
				<NativeSelect
					id="sort"
					value={search.sort || "newest"}
					onChange={(e) =>
						void onChange({
							sort: e.target.value as "newest" | "price-asc" | "price-desc",
						})
					}
				>
					<NativeSelectOption value="newest">
						ახალი დამატებული
					</NativeSelectOption>
					<NativeSelectOption value="price-asc">
						ფასი: ზრდადობით
					</NativeSelectOption>
					<NativeSelectOption value="price-desc">
						ფასი: კლებადობით
					</NativeSelectOption>
				</NativeSelect>
			</Label>
			<Label htmlFor="discount" className="checkbox-label">
				<Checkbox
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
