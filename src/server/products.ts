import type { DatabaseSync, SQLInputValue } from "node:sqlite";
import type {
	AdminProduct,
	ProductImage,
	PublicProduct,
} from "../data/catalog.ts";

const prefixed = (columns: string) =>
	columns
		.split(/\s+/)
		.map((column) => `p.${column}`)
		.join(", ");

const publicColumns = prefixed(
	"id slug name brand category_slug description price_minor sale_price_minor stock_status meta_description features_json created_at updated_at",
);
const adminColumns = `${publicColumns}, ${prefixed("status sku is_featured")}`;

type Row = Record<string, unknown>;

/** One images query for all rows, grouped once instead of filtered per product. */
function hydrate<T>(db: DatabaseSync, rows: Row[]): T[] {
	if (!rows.length) return [];
	const ids = rows.map((row) => row.id as number);
	const images = db
		.prepare(
			`SELECT product_id, url, alt FROM product_images WHERE product_id IN (${ids.map(() => "?").join(",")}) ORDER BY sort_order, id`,
		)
		.all(...ids);
	const byProduct = Map.groupBy(images, (image) => image.product_id as number);

	return rows.map(({ features_json, ...row }) => ({
		...row,
		features: JSON.parse(String(features_json)) as string[],
		images: (byProduct.get(row.id as number) ?? []).map(
			({ url, alt }) => ({ url, alt }) as ProductImage,
		),
	})) as T[];
}

export interface PublicProductQuery {
	query?: string;
	category?: string;
	slug?: string;
	featured?: boolean;
	limit?: number;
}

function publicProductFilters({
	query = "",
	category,
	slug,
	featured,
}: PublicProductQuery) {
	const where = ["p.status='published'", "c.is_active=1"];
	const params: SQLInputValue[] = [];

	const tokens = query.slice(0, 200).match(/[\p{L}\p{N}]+/gu) ?? [];
	if (tokens.length) {
		where.push(
			"p.id IN (SELECT rowid FROM products_fts WHERE products_fts MATCH ?)",
		);
		params.push(tokens.map((token) => `"${token}"*`).join(" AND "));
	}
	if (category) {
		where.push("p.category_slug=?");
		params.push(category);
	}
	if (slug) {
		where.push("p.slug=?");
		params.push(slug);
	}
	if (featured) where.push("p.is_featured=1");

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
	return hydrate<PublicProduct>(db, db.prepare(sql).all(...params));
}

export function queryProduct(db: DatabaseSync, slug: string) {
	return queryPublicProducts(db, { slug, limit: 1 })[0] ?? null;
}

function queryAdmin(
	db: DatabaseSync,
	where = "",
	...params: SQLInputValue[]
): AdminProduct[] {
	const rows = db
		.prepare(
			`SELECT ${adminColumns} FROM products p ${where} ORDER BY p.id DESC`,
		)
		.all(...params);
	return hydrate<AdminProduct>(db, rows).map((product) => ({
		...product,
		is_featured: Boolean(product.is_featured),
	}));
}

export const queryAdminProducts = (db: DatabaseSync) => queryAdmin(db);

export const getAdminProduct = (db: DatabaseSync, id: number) =>
	queryAdmin(db, "WHERE p.id=?", id)[0];
