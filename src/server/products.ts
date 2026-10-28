// Product reads. The public path never selects admin-only columns.
import type { DatabaseSync, SQLInputValue } from "node:sqlite";
import type {
	AdminProduct,
	ProductImage,
	PublicProduct,
} from "../data/catalog.ts";

const publicColumns =
	"p.id, p.slug, p.name, p.brand, p.category_slug, p.description, p.price_minor, p.sale_price_minor, p.stock_status, p.meta_description, p.features_json, p.created_at, p.updated_at";
const adminColumns = `${publicColumns}, p.status, p.sku, p.is_featured`;

type Row = Record<string, unknown>;

/** One images query for all rows, grouped once instead of filtered per product. */
function hydrate(
	db: DatabaseSync,
	rows: Row[],
): (Row & { features: string[]; images: ProductImage[] })[] {
	if (!rows.length) return [];
	const ids = rows.map((row) => row.id as number);
	const images = db
		.prepare(
			`SELECT product_id, url, alt FROM product_images WHERE product_id IN (${ids.map(() => "?").join(",")}) ORDER BY sort_order, id`,
		)
		.all(...ids);
	const byProduct = Map.groupBy(images, (image) => image.product_id as number);
	return rows.map((row) => {
		const { features_json, ...fields } = row;
		const gallery: ProductImage[] = (byProduct.get(row.id as number) ?? []).map(
			(image) => ({ url: image.url as string, alt: image.alt as string }),
		);
		return {
			...fields,
			features: JSON.parse(String(features_json)) as string[],
			images: gallery,
		};
	});
}

export interface PublicProductQuery {
	query?: string;
	category?: string;
	slug?: string;
	featured?: boolean;
	limit?: number;
}

function publicProductFilters(options: PublicProductQuery) {
	const where = ["p.status='published'", "c.is_active=1"];
	const params: SQLInputValue[] = [];
	const tokens =
		(options.query ?? "").slice(0, 200).match(/[\p{L}\p{N}]+/gu) ?? [];
	if (tokens.length) {
		where.push(
			"p.id IN (SELECT rowid FROM products_fts WHERE products_fts MATCH ?)",
		);
		params.push(tokens.map((token) => `"${token}"*`).join(" AND "));
	}
	if (options.category) {
		where.push("p.category_slug=?");
		params.push(options.category);
	}
	if (options.slug) {
		where.push("p.slug=?");
		params.push(options.slug);
	}
	if (options.featured) where.push("p.is_featured=1");
	return { where, params };
}

export function queryPublicProducts(
	db: DatabaseSync,
	options: PublicProductQuery = {},
): PublicProduct[] {
	const { where, params } = publicProductFilters(options);
	let sql = `SELECT ${publicColumns} FROM products p JOIN categories c ON c.slug=p.category_slug WHERE ${where.join(" AND ")} ORDER BY p.created_at DESC, p.id DESC`;
	if (options.limit) {
		sql += " LIMIT ?";
		params.push(options.limit);
	}
	return hydrate(
		db,
		db.prepare(sql).all(...params),
	) as unknown as PublicProduct[];
}

export function queryProduct(db: DatabaseSync, slug: string) {
	return queryPublicProducts(db, { slug, limit: 1 })[0] ?? null;
}

function toAdmin(db: DatabaseSync, rows: Row[]): AdminProduct[] {
	return hydrate(db, rows).map((product) => ({
		...product,
		is_featured: Boolean(product.is_featured),
	})) as unknown as AdminProduct[];
}

export function queryAdminProducts(db: DatabaseSync): AdminProduct[] {
	return toAdmin(
		db,
		db
			.prepare(`SELECT ${adminColumns} FROM products p ORDER BY p.id DESC`)
			.all(),
	);
}

export function getAdminProduct(db: DatabaseSync, id: number) {
	return toAdmin(
		db,
		db.prepare(`SELECT ${adminColumns} FROM products p WHERE p.id=?`).all(id),
	)[0];
}
