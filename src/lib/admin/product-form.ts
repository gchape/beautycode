import type { ProductImage } from "../../data/catalog.ts";
import { gelToMinor, productInput } from "./schemas.ts";

export function readProductForm(
	form: FormData,
	images: ProductImage[],
	id?: number,
) {
	const value = (key: string) => String(form.get(key) ?? "").trim();
	const optionalPrice = (key: string) => {
		const raw = value(key);
		return raw ? gelToMinor(raw) : null;
	};

	return productInput.parse({
		id,
		name: value("name"),
		brand: value("brand"),
		category_slug: value("category_slug"),
		description: value("description"),
		price_minor: gelToMinor(value("price")),
		sale_price_minor: optionalPrice("sale_price"),
		sku: value("sku") || null,
		stock_status: value("stock_status"),
		status: value("status"),
		meta_description: value("meta_description"),
		is_featured: form.has("is_featured"),
		features: value("features")
			.split(/\r?\n/)
			.map((line) => line.trim())
			.filter(Boolean),
		images,
	});
}
