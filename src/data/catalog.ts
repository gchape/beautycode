import type { CategoryIcon, ProductStatus, StockStatus } from "./labels.ts";

export interface Category {
	slug: string;
	name: string;
	description: string;
	icon: CategoryIcon;
	sort_order: number;
	is_active: boolean;
}

export interface ProductImage {
	url: string;
	alt: string;
}

/** What the public storefront receives. Never contains admin-only fields. */
export interface PublicProduct {
	id: number;
	slug: string;
	name: string;
	brand: string;
	category_slug: string;
	description: string;
	price_minor: number;
	sale_price_minor: number | null;
	stock_status: StockStatus;
	meta_description: string;
	features: string[];
	/** Gallery in display order; the first image is the cover. */
	images: ProductImage[];
	created_at: string;
	updated_at: string;
}

export interface AdminProduct extends PublicProduct {
	status: ProductStatus;
	sku: string | null;
	is_featured: boolean;
}

type Priced = Pick<PublicProduct, "price_minor" | "sale_price_minor">;

export const finalPrice = (p: Priced) => p.sale_price_minor ?? p.price_minor;

/** Derived from the two prices, so it can never disagree with them. */
export const discountPercent = (p: Priced) =>
	p.sale_price_minor !== null &&
	p.price_minor > 0 &&
	p.sale_price_minor < p.price_minor
		? Math.round((1 - p.sale_price_minor / p.price_minor) * 100)
		: 0;

export const coverImage = (p: Pick<PublicProduct, "images">) =>
	p.images[0]?.url ?? null;

const priceFormat = new Intl.NumberFormat("ka-GE", {
	maximumFractionDigits: 2,
});

export const money = (minor: number) => `${priceFormat.format(minor / 100)} ₾`;
