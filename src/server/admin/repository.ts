import type { DatabaseSync } from "node:sqlite";
import type { AuditEntry } from "../../data/audit.ts";
import {
	categoryInput,
	type ProductInput,
	productInput,
	slugify,
} from "../../lib/admin/schemas.ts";
import { queryCategories } from "../categories.ts";
import { queryAdminProducts } from "../products.ts";
import { withTransaction } from "../transaction.ts";

const now = "strftime('%Y-%m-%dT%H:%M:%fZ','now')";

export function recordAudit(
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

export const listProducts = (db: DatabaseSync) => queryAdminProducts(db);

export const listCategories = (db: DatabaseSync) =>
	queryCategories(db, { includeInactive: true });

export function listAuditLog(db: DatabaseSync, limit = 100) {
	return db
		.prepare(
			"SELECT id, username, action, entity, entity_id, created_at FROM admin_audit_log ORDER BY id DESC LIMIT ?",
		)
		.all(limit) as unknown as AuditEntry[];
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

export function saveProduct(db: DatabaseSync, raw: unknown, user: string) {
	const input = productInput.parse(raw);
	return withTransaction(db, () => {
		if (
			!db
				.prepare("SELECT 1 FROM categories WHERE slug=?")
				.get(input.category_slug)
		)
			throw new Response("Unknown category", { status: 400 });
		const existing = input.id
			? (db.prepare("SELECT slug FROM products WHERE id=?").get(input.id) as
					| { slug: string }
					| undefined)
			: undefined;
		if (input.id && !existing) throw new Response("Not found", { status: 404 });
		const slug = existing?.slug ?? uniqueSlug(db, "products", input.name);
		const id = input.id
			? updateProduct(db, input.id, input)
			: insertProduct(db, input, slug);
		replaceProductImages(db, id, input);
		recordAudit(
			db,
			user,
			existing ? "update" : "create",
			"product",
			String(id),
		);
		return { id, slug };
	});
}

export function saveCategory(db: DatabaseSync, raw: unknown, user: string) {
	const input = categoryInput.parse(raw);
	return withTransaction(db, () => {
		if (
			input.slug &&
			!db.prepare("SELECT 1 FROM categories WHERE slug=?").get(input.slug)
		)
			throw new Response("Not found", { status: 404 });
		const slug = input.slug || uniqueSlug(db, "categories", input.name);
		db.prepare(
			`INSERT INTO categories(slug,name,description,icon,sort_order,is_active)
			 VALUES($slug,$name,$description,$icon,$sort_order,$is_active)
			 ON CONFLICT(slug) DO UPDATE SET name=excluded.name,description=excluded.description,
			 icon=excluded.icon,sort_order=excluded.sort_order,is_active=excluded.is_active`,
		).run({
			slug,
			name: input.name,
			description: input.description,
			icon: input.icon,
			sort_order: input.sort_order,
			is_active: Number(input.is_active),
		});
		recordAudit(db, user, input.slug ? "update" : "create", "category", slug);
		return { slug };
	});
}

function productFields(input: ProductInput) {
	return {
		name: input.name,
		brand: input.brand,
		category_slug: input.category_slug,
		description: input.description,
		price_minor: input.price_minor,
		sale_price_minor: input.sale_price_minor,
		stock_status: input.stock_status,
		status: input.status,
		sku: input.sku || null,
		meta_description: input.meta_description,
		is_featured: Number(input.is_featured),
		features_json: JSON.stringify(input.features),
	};
}

function insertProduct(db: DatabaseSync, input: ProductInput, slug: string) {
	const result = db
		.prepare(
			`INSERT INTO products(slug,name,brand,category_slug,description,price_minor,sale_price_minor,
			   stock_status,status,sku,meta_description,is_featured,features_json,created_at)
			 VALUES($slug,$name,$brand,$category_slug,$description,$price_minor,$sale_price_minor,
			   $stock_status,$status,$sku,$meta_description,$is_featured,$features_json,${now})`,
		)
		.run({ ...productFields(input), slug });
	return Number(result.lastInsertRowid);
}

function updateProduct(db: DatabaseSync, id: number, input: ProductInput) {
	db.prepare(
		`UPDATE products SET name=$name,brand=$brand,category_slug=$category_slug,description=$description,
		   price_minor=$price_minor,sale_price_minor=$sale_price_minor,stock_status=$stock_status,
		   status=$status,sku=$sku,meta_description=$meta_description,is_featured=$is_featured,
		   features_json=$features_json,updated_at=${now}
		 WHERE id=$id`,
	).run({ ...productFields(input), id });
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
