import { z } from "zod";
import { maxImagesPerProduct } from "../../data/image-types.ts";
import {
	categoryIconNames,
	productStatuses,
	stockStatuses,
} from "../../data/labels.ts";

const trimmedString = (max: number) => z.string().trim().max(max);

const imageUrl = z
	.string()
	.max(2048)
	.refine((value) => {
		if (/^\/images\/[a-zA-Z0-9._-]+$/.test(value)) return true;
		if (
			/^\/uploads\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(?:webp|png|jpg|avif)$/.test(
				value,
			)
		)
			return true;
		try {
			return new URL(value).protocol === "https:";
		} catch {
			return false;
		}
	}, "სურათის მისამართი უნდა იყოს HTTPS, /images/... ან /uploads/...");

export const productInput = z
	.object({
		id: z.number().int().positive().optional(),
		name: trimmedString(200).min(1),
		brand: trimmedString(100),
		category_slug: trimmedString(200).min(1),
		description: trimmedString(10000),
		price_minor: z.number().int().min(0).max(100000000),
		sale_price_minor: z.number().int().min(0).max(100000000).nullable(),
		stock_status: z.enum(stockStatuses),
		status: z.enum(productStatuses),
		sku: trimmedString(100).nullable(),
		meta_description: trimmedString(300),
		is_featured: z.boolean(),
		features: z.array(trimmedString(500).min(1)).max(50),
		images: z
			.array(z.object({ url: imageUrl, alt: trimmedString(200) }))
			.max(maxImagesPerProduct),
	})
	.refine(
		(p) => p.sale_price_minor === null || p.sale_price_minor <= p.price_minor,
		{
			message: "ფასდაკლებული ფასი საწყის ფასს არ უნდა აღემატებოდეს",
			path: ["sale_price_minor"],
		},
	);

export type ProductInput = z.infer<typeof productInput>;

export const categoryInput = z.object({
	slug: trimmedString(200).optional(),
	name: trimmedString(100).min(1),
	description: trimmedString(500),
	icon: z.enum(categoryIconNames),
	sort_order: z.number().int().min(0).max(10000),
	is_active: z.boolean(),
});

export type CategoryInput = z.infer<typeof categoryInput>;

export function slugify(name: string) {
	return (
		name
			.toLowerCase()
			.normalize("NFC")
			.replace(/[^\p{L}\p{N}]+/gu, "-")
			.replace(/^-|-$/g, "") || "item"
	);
}

export function gelToMinor(value: string): number {
	if (!/^\d+(?:\.\d{1,2})?$/.test(value))
		throw new Error("ფასი მიუთითეთ მაქსიმუმ ორი ათწილადით");
	const [whole, fraction = ""] = value.split(".");
	return Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
}
