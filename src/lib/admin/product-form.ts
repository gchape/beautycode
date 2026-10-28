import type { ProductImage } from "../../data/catalog.ts";
import { gelToMinor, productInput } from "./schemas.ts";

export function readProductForm(
	form: FormData,
	images: ProductImage[],
	id?: number,
) {
	const value = (key: string) => String(form.get(key) ?? "").trim();
	const salePrice = value("sale_price");
	return productInput.parse({
		id,
		name: value("name"),
		brand: value("brand"),
		category_slug: value("category_slug"),
		description: value("description"),
		price_minor: gelToMinor(value("price")),
		sale_price_minor: salePrice ? gelToMinor(salePrice) : null,
		sku: value("sku") || null,
		stock_status: value("stock_status"),
		status: value("status"),
		meta_description: value("meta_description"),
		is_featured: form.has("is_featured"),
		features: value("features")
			.split("\n")
			.map((line) => line.trim())
			.filter(Boolean),
		images,
	});
}
