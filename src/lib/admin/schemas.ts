import { z } from "zod";
import { maxImagesPerProduct } from "../../data/image-types.ts";
import {
	categoryIconNames,
	productStatuses,
	stockStatuses,
} from "../../data/labels.ts";

const text = (max: number) => z.string().trim().max(max);
const required = (max: number) => text(max).min(1);

const priceMinor = z.number().int().min(0).max(100_000_000);

const httpsMessage = "სურათის მისამართი უნდა იყოს HTTPS ბმული";
const imageUrl = z
	.string()
	.max(2048)
	.url(httpsMessage)
	.startsWith("https://", httpsMessage);

export const productInput = z
	.object({
		id: z.number().int().positive().optional(),
		name: required(200),
		brand: text(100),
		category_slug: required(200),
		description: text(10_000),
		price_minor: priceMinor,
		sale_price_minor: priceMinor.nullable(),
		stock_status: z.enum(stockStatuses),
		status: z.enum(productStatuses),
		sku: text(100).nullable(),
		meta_description: text(300),
		is_featured: z.boolean(),
		features: z.array(required(500)).max(50),
		images: z
			.array(z.object({ url: imageUrl, alt: text(200) }))
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
	slug: text(200).optional(),
	name: required(100),
	description: text(500),
	icon: z.enum(categoryIconNames),
	sort_order: z.number().int().min(0).max(10_000),
	is_active: z.boolean(),
});

export type CategoryInput = z.infer<typeof categoryInput>;

export function slugify(name: string) {
	return (
		name
			.normalize("NFC")
			.toLowerCase()
			.replace(/[^\p{L}\p{N}]+/gu, "-")
			.replace(/^-|-$/g, "") || "item"
	);
}

export function gelToMinor(value: string): number {
	if (!/^\d+(?:\.\d{1,2})?$/.test(value))
		throw new Error("ფასი მიუთითეთ მაქსიმუმ ორი ათწილადით");
	const [whole, fraction = ""] = value.split(".");
	return Number(whole + fraction.padEnd(2, "0"));
}
