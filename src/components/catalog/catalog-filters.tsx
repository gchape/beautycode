import type { CatalogSearch } from "../../lib/catalog-search";
import { useCategories } from "../catalog/category-context";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";

export function CatalogFilters({
	search,
	onChange: update,
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
						void update({ category: e.target.value || undefined })
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
						void update({
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
						void update({
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
						void update({ discount: checked === true || undefined })
					}
				/>
				მხოლოდ ფასდაკლებით
			</Label>
		</div>
	);
}
