import type { ProductImage } from "../../data/catalog";
import { gelToMinor, productInput } from "./schemas.ts";

export function readProductForm(
	form: FormData,
	images: ProductImage[],
	id?: number,
) {
	const value = (key: string) => String(form.get(key) || "").trim();
	return productInput.parse({
		id,
		name: value("name"),
		brand: value("brand"),
		category_slug: value("category"),
		description: value("description"),
		price_minor: gelToMinor(value("price")),
		sale_price_minor: value("sale") ? gelToMinor(value("sale")) : null,
		sku: value("sku") || null,
		stock_status: value("stock"),
		status: value("status"),
		meta_description: value("meta"),
		is_featured: form.has("featured"),
		features: value("features")
			.split("\n")
			.map((s) => s.trim())
			.filter(Boolean),
		images,
	});
}
