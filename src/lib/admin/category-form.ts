import { categoryInput } from "./schemas.ts";

export function readCategoryForm(form: FormData, slug?: string) {
	const value = (key: string) => String(form.get(key) ?? "");
	return categoryInput.parse({
		slug,
		name: value("name"),
		description: value("description"),
		icon: value("icon"),
		sort_order: Number(value("sort_order")),
		is_active: form.has("is_active"),
	});
}
