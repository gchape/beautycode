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

type SlugTable = "products" | "categories";

const now = "strftime('%Y-%m-%dT%H:%M:%fZ','now')";

const slugExists = (db: DatabaseSync, table: SlugTable, slug: string) =>
	Boolean(db.prepare(`SELECT 1 FROM ${table} WHERE slug=?`).get(slug));

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

export const listProducts = queryAdminProducts;

export const listCategories = (db: DatabaseSync) =>
	queryCategories(db, { includeInactive: true });

export function listAuditLog(db: DatabaseSync, limit = 100) {
	return db
		.prepare(
			"SELECT id, username, action, entity, entity_id, created_at FROM admin_audit_log ORDER BY id DESC LIMIT ?",
		)
		.all(limit) as unknown as AuditEntry[];
}

function uniqueSlug(db: DatabaseSync, table: SlugTable, name: string) {
	const base = slugify(name);
	let slug = base;
	for (let n = 2; slugExists(db, table, slug); n++) slug = `${base}-${n}`;
	return slug;
}

export function saveProduct(db: DatabaseSync, raw: unknown, user: string) {
	const input = productInput.parse(raw);
	return withTransaction(db, () => {
		if (!slugExists(db, "categories", input.category_slug))
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
		if (input.slug && !slugExists(db, "categories", input.slug))
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

// Column names come from productFields above, never from user input.
function insertProduct(db: DatabaseSync, input: ProductInput, slug: string) {
	const fields = { ...productFields(input), slug };
	const columns = Object.keys(fields);
	const { lastInsertRowid } = db
		.prepare(
			`INSERT INTO products(${columns},created_at)
			 VALUES(${columns.map((c) => `$${c}`)},${now})`,
		)
		.run(fields);
	return Number(lastInsertRowid);
}

function updateProduct(db: DatabaseSync, id: number, input: ProductInput) {
	const fields = productFields(input);
	const assignments = Object.keys(fields).map((c) => `${c}=$${c}`);
	db.prepare(
		`UPDATE products SET ${assignments},updated_at=${now} WHERE id=$id`,
	).run({ ...fields, id });
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
