import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { test } from "node:test";
import { saveProduct } from "../src/server/admin/repository.ts";
import { queryCategories } from "../src/server/categories.ts";
import { migrateDatabase } from "../src/server/migrations.ts";
import {
	getAdminProduct,
	queryProduct,
	queryPublicProducts,
} from "../src/server/products.ts";

function database(t) {
	const db = new DatabaseSync(":memory:");
	t.after(() => db.close());
	db.exec("PRAGMA foreign_keys=ON");
	migrateDatabase(db);
	return db;
}

test("public queries hide admin fields, drafts and inactive categories and filter in SQL", (t) => {
	const db = database(t);
	const product = queryPublicProducts(db)[0];
	const admin = getAdminProduct(db, product.id);
	assert.equal(typeof admin.is_featured, "boolean");
	assert.equal(typeof queryCategories(db)[0].is_active, "boolean");
	for (const field of [
		"status",
		"sku",
		"is_featured",
		"features_json",
		"image_url",
		"discount_percent",
	])
		assert.equal(Object.hasOwn(product, field), false);
	assert.deepEqual(queryProduct(db, product.slug), product);
	assert.equal(queryProduct(db, "missing"), null);
	assert.ok(
		queryPublicProducts(db, { category: product.category_slug }).every(
			(p) => p.category_slug === product.category_slug,
		),
	);
	db.prepare("UPDATE products SET is_featured=0 WHERE id=?").run(product.id);
	assert.ok(
		!queryPublicProducts(db, { featured: true, limit: 2 }).some(
			(p) => p.id === product.id,
		),
	);
	assert.equal(queryPublicProducts(db, { limit: 2 }).length, 2);
	db.prepare("UPDATE products SET status='draft' WHERE id=?").run(product.id);
	assert.equal(queryProduct(db, product.slug), null);
	db.prepare("UPDATE products SET status='published' WHERE id=?").run(
		product.id,
	);
	db.prepare("UPDATE categories SET is_active=0 WHERE slug=?").run(
		product.category_slug,
	);
	assert.equal(queryProduct(db, product.slug), null);
});

test("failed image writes roll back product edits and audit entries", (t) => {
	const db = database(t);
	const before = getAdminProduct(db, 1);
	const auditCount = db
		.prepare("SELECT count(*) AS n FROM admin_audit_log")
		.get().n;
	db.exec(
		"CREATE TRIGGER reject_image BEFORE INSERT ON product_images BEGIN SELECT RAISE(ABORT, 'image rejected'); END",
	);
	assert.throws(
		() => saveProduct(db, { ...before, name: "Changed" }, "owner"),
		/image rejected/,
	);
	assert.deepEqual(getAdminProduct(db, 1), before);
	assert.equal(
		db.prepare("SELECT count(*) AS n FROM admin_audit_log").get().n,
		auditCount,
	);
});

test("initial schema provides timestamps and galleries without derived columns", (t) => {
	const db = database(t);
	const product = getAdminProduct(db, 1);
	assert.equal(product.sale_price_minor, 14900);
	assert.equal(product.images[0].url, "/images/ipl-colors-cutout.png");
	assert.ok(product.created_at);
	const columns = db.prepare("PRAGMA table_info(products)").all();
	assert.ok(
		!columns.some((column) =>
			["discount_percent", "image_url"].includes(column.name),
		),
	);
	assert.equal(
		columns.find((column) => column.name === "created_at").notnull,
		1,
	);
});
