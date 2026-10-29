import { categoryInput } from "./schemas.ts";

export function readCategoryForm(form: FormData, slug?: string) {
	const value = (key: string) => String(form.get(key) ?? "").trim();
	const sortOrder = value("sort_order");

	return categoryInput.parse({
		slug,
		name: value("name"),
		description: value("description"),
		icon: value("icon"),
		sort_order: sortOrder === "" ? Number.NaN : Number(sortOrder),
		is_active: form.has("is_active"),
	});
}
