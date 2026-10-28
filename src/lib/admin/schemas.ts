import { z } from "zod";

const text = (max: number) => z.string().trim().max(max);

const imageUrl = z
	.string()
	.max(2048)
	.refine((value) => {
		if (/^\/images\/[a-zA-Z0-9._-]+$/.test(value)) return true;
		try {
			return new URL(value).protocol === "https:";
		} catch {
			return false;
		}
	}, "სურათის მისამართი უნდა იყოს HTTPS ან /images/... ");

export const productInput = z
	.object({
		id: z.number().int().positive().optional(),
		name: text(200).min(1),
		brand: text(100),
		category_slug: text(200).min(1),
		description: text(10000),
		price_minor: z.number().int().min(0).max(100000000),
		sale_price_minor: z.number().int().min(0).max(100000000).nullable(),
		stock_status: z.enum(["in_stock", "out_of_stock", "preorder"]),
		status: z.enum(["draft", "published", "archived"]),
		sku: text(100).nullable(),
		meta_description: text(300),
		is_featured: z.boolean(),
		features: z.array(text(500).min(1)).max(50),
		images: z.array(z.object({ url: imageUrl, alt: text(200) })).max(12),
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
	name: text(100).min(1),
	description: text(500),
	icon: z.enum(["wind", "sparkles", "droplet", "smile"]),
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
