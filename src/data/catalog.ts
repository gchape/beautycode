export const categories = [
	{
		slug: "თმის-მოვლა",
		name: "თმის მოვლა",
		description: "თმისა და სკალპის ყოველდღიური მოვლა",
		icon: "wind",
	},
	{
		slug: "ეპილატორები",
		name: "ეპილატორები",
		description: "გლუვი კანისთვის, ყოველდღე",
		icon: "sparkles",
	},
	{
		slug: "კანის-მოვლა",
		name: "სახის მოვლა",
		description: "სახის გაწმენდა და მასაჟი",
		icon: "droplet",
	},
	{
		slug: "პირის-ღრუს-მოვლა",
		name: "პირის ღრუს მოვლა",
		description: "კბილებისა და ღრძილების ყოველდღიური ჰიგიენა",
		icon: "smile",
	},
] as const;
export interface Category {
	slug: string;
	name: string;
	description: string;
	icon: "wind" | "sparkles" | "droplet" | "smile";
	sort_order: number;
	is_active: number;
}
export interface ProductImage {
	url: string;
	alt: string;
}
export interface Product {
	id: number;
	status?: "draft" | "published" | "archived";
	sku?: string | null;
	meta_description?: string;
	is_featured?: number;
	updated_at?: string;
	images?: ProductImage[];
	slug: string;
	name: string;
	brand: string;
	category_slug: string;
	description: string;
	price_minor: number;
	sale_price_minor?: number | null;
	features?: string[];
	discount_percent: number;
	stock_status: "in_stock" | "out_of_stock" | "preorder";
	image_url: string | null;
}
export const finalPrice = (
	p: Pick<Product, "price_minor" | "discount_percent" | "sale_price_minor">,
) =>
	p.sale_price_minor ??
	Math.floor((p.price_minor * (100 - p.discount_percent) + 50) / 100);
export const money = (minor: number) =>
	`${new Intl.NumberFormat("ka-GE", { maximumFractionDigits: 2 }).format(minor / 100)} ₾`;
