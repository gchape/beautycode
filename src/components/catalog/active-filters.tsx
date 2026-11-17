import { X } from "lucide-react";
import type { CatalogSearch } from "../../lib/catalog-search.ts";
import { Button } from "../ui/button.tsx";
import { useCategories } from "./category-context.tsx";

export function ActiveFilters({
	search,
	onChange,
}: {
	search: CatalogSearch;
	onChange: (values: Partial<CatalogSearch>) => void;
}) {
	const categories = useCategories();
	const filters: { key: keyof CatalogSearch; label: string }[] = [];
	if (search.q) filters.push({ key: "q", label: `ძიება: ${search.q}` });
	if (search.category)
		filters.push({
			key: "category",
			label:
				categories.find((category) => category.slug === search.category)
					?.name ?? search.category,
		});
	if (search.discount) filters.push({ key: "discount", label: "ფასდაკლებით" });
	if (search.max !== undefined)
		filters.push({ key: "max", label: `მაქს. ფასი: ${search.max} ₾` });
	if (!filters.length) return null;
	return (
		<ul
			aria-label="არჩეული ფილტრები"
			className="mt-3 mb-0 flex list-none flex-wrap gap-2 p-0"
		>
			{filters.map(({ key, label }) => (
				<li key={key} className="min-w-0 max-w-full">
					<Button
						size="compact"
						variant="secondary"
						className="text-left text-xs"
						aria-label={`${label} — ფილტრის მოხსნა`}
						onClick={() => onChange({ [key]: undefined })}
					>
						<span className="min-w-0 wrap-anywhere">{label}</span>
						<X size={14} aria-hidden="true" />
					</Button>
				</li>
			))}
		</ul>
	);
}
