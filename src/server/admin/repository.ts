import type { DatabaseSync } from "node:sqlite";
import type { Product } from "../../data/catalog.ts";
import {
	categoryInput,
	type ProductInput,
	productInput,
	slugify,
} from "../../lib/admin/schemas.ts";

export function audit(
	db: DatabaseSync,
	user: string,
	action: string,
	entity: string,
	id: string,
) {
	db.prepare(
		"INSERT INTO admin_audit_log(username,action,entity,entity_id) VALUES(?,?,?,?)",
	).run(user, action, entity, id);
}
function uniqueSlug(
	db: DatabaseSync,
	table: "products" | "categories",
	name: string,
) {
	const base = slugify(name);
	let slug = base;
	let suffix = 2;
	while (db.prepare(`SELECT 1 FROM ${table} WHERE slug=?`).get(slug))
		slug = `${base}-${suffix++}`;
	return slug;
}
export function hydrateProducts(
	db: DatabaseSync,
	rows: Record<string, unknown>[],
): Product[] {
	const images = db
		.prepare(
			"SELECT product_id,url,alt FROM product_images ORDER BY sort_order,id",
		)
		.all();
	return rows.map((row) => {
		const { features_json, ...product } = row;
		return {
			...product,
			features: JSON.parse(String(features_json)),
			images: images
				.filter((i) => i.product_id === row.id)
				.map((i) => ({ url: i.url, alt: i.alt })),
		} as unknown as Product;
	});
}
export function saveProduct(db: DatabaseSync, raw: unknown, user: string) {
	const input = productInput.parse(raw);
	if (
		!db
			.prepare("SELECT 1 FROM categories WHERE slug=?")
			.get(input.category_slug)
	)
		throw new Response("Unknown category", { status: 400 });
	const existing = input.id
		? db.prepare("SELECT slug FROM products WHERE id=?").get(input.id)
		: undefined;
	if (input.id && !existing) throw new Response("Not found", { status: 404 });
	db.exec("BEGIN IMMEDIATE");
	try {
		const slug = existing?.slug ?? uniqueSlug(db, "products", input.name);
		const id = writeProduct(db, input, String(slug));
		replaceProductImages(db, id, input);
		audit(db, user, existing ? "update" : "create", "product", String(id));
		db.exec("COMMIT");
		return { id, slug };
	} catch (error) {
		db.exec("ROLLBACK");
		throw error;
	}
}
export function saveCategory(db: DatabaseSync, raw: unknown, user: string) {
	const input = categoryInput.parse(raw);
	if (
		input.slug &&
		!db.prepare("SELECT 1 FROM categories WHERE slug=?").get(input.slug)
	)
		throw new Response("Not found", { status: 404 });
	db.exec("BEGIN IMMEDIATE");
	try {
		const slug = input.slug || uniqueSlug(db, "categories", input.name);
		db.prepare(
			"INSERT INTO categories(slug,name,description,icon,sort_order,is_active) VALUES(?,?,?,?,?,?) ON CONFLICT(slug) DO UPDATE SET name=excluded.name,description=excluded.description,icon=excluded.icon,sort_order=excluded.sort_order,is_active=excluded.is_active",
		).run(
			slug,
			input.name,
			input.description,
			input.icon,
			input.sort_order,
			Number(input.is_active),
		);
		audit(db, user, input.slug ? "update" : "create", "category", slug);
		db.exec("COMMIT");
		return { slug };
	} catch (error) {
		db.exec("ROLLBACK");
		throw error;
	}
}

function writeProduct(db: DatabaseSync, input: ProductInput, slug: string) {
	const discount =
		input.sale_price_minor !== null && input.price_minor > 0
			? Math.round((1 - input.sale_price_minor / input.price_minor) * 100)
			: 0;
	const values = [
		input.name,
		input.brand,
		input.category_slug,
		input.description,
		input.price_minor,
		input.sale_price_minor,
		discount,
		input.stock_status,
		input.status,
		input.sku || null,
		input.meta_description,
		Number(input.is_featured),
		JSON.stringify(input.features),
		input.images[0]?.url ?? null,
	];
	let id = input.id;
	if (id) {
		db.prepare(
			"UPDATE products SET name=?,brand=?,category_slug=?,description=?,price_minor=?,sale_price_minor=?,discount_percent=?,stock_status=?,status=?,sku=?,meta_description=?,is_featured=?,features_json=?,image_url=?,updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=?",
		).run(...values, id);
	} else {
		id = Number(
			db
				.prepare(
					"INSERT INTO products(name,brand,category_slug,description,price_minor,sale_price_minor,discount_percent,stock_status,status,sku,meta_description,is_featured,features_json,image_url,slug) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
				)
				.run(...values, slug).lastInsertRowid,
		);
	}
	return id;
}

function replaceProductImages(
	db: DatabaseSync,
	id: number,
	input: ProductInput,
) {
	db.prepare("DELETE FROM product_images WHERE product_id=?").run(id);
	const insert = db.prepare(
		"INSERT INTO product_images(product_id,url,alt,sort_order) VALUES(?,?,?,?)",
	);
	input.images.forEach((image, index) => {
		insert.run(id, image.url, image.alt || input.name, index);
	});
}
