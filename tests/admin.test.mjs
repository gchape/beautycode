import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { test } from "node:test";
import { readProductForm } from "../src/lib/admin/product-form.ts";
import { gelToMinor } from "../src/lib/admin/schemas.ts";
import { requireAdmin } from "../src/server/admin/auth.ts";
import { saveCategory, saveProduct } from "../src/server/admin/repository.ts";
import { migrateDatabase } from "../src/server/migrations.ts";
import { getAdminProduct } from "../src/server/products.ts";

function database() {
	const db = new DatabaseSync(":memory:");
	db.exec("PRAGMA foreign_keys=ON");
	migrateDatabase(db);
	return db;
}
const product = {
	name: "ახალი მოწყობილობა",
	brand: "Beauty",
	category_slug: "კანის-მოვლა",
	description: "აღწერა",
	price_minor: 1999,
	sale_price_minor: 1500,
	status: "draft",
	stock_status: "in_stock",
	sku: null,
	meta_description: "",
	is_featured: true,
	features: ["რეჟიმი"],
	images: [{ url: "/images/face-cleanser-cutout.png", alt: "ვაკუუმი" }],
};

test("admin requires a proxy identity and same-origin writes", () => {
	const origin = process.env.SITE_URL || "https://shop.example.com";
	const request = (method, headers = {}) =>
		new Request(`${origin}/admin/api/products`, { method, headers });
	assert.throws(
		() => requireAdmin(request("GET")),
		(error) => error.status === 401,
	);
	assert.equal(
		requireAdmin(request("GET", { "x-remote-user": "owner" })),
		"owner",
	);
	assert.throws(
		() => requireAdmin(request("POST", { "x-remote-user": "owner" })),
		(error) => error.status === 403,
	);
	assert.throws(
		() =>
			requireAdmin(
				request("POST", {
					"x-remote-user": "owner",
					origin: "https://attacker.example",
				}),
			),
		(error) => error.status === 403,
	);
	assert.equal(
		requireAdmin(request("POST", { "x-remote-user": "owner", origin })),
		"owner",
	);
});

test("product edits preserve slugs, exact prices, gallery order and search synchronization", () => {
	const db = database();
	try {
		const first = saveProduct(db, product, "owner");
		const second = saveProduct(db, product, "owner");
		assert.notEqual(first.slug, second.slug);
		const edited = saveProduct(
			db,
			{
				...product,
				id: first.id,
				name: "შეცვლილი დასახელება",
				status: "published",
				sale_price_minor: 0,
				images: [
					{ url: "/images/ipl-kit-cutout.png", alt: "ნაკრები" },
					...product.images,
				],
			},
			"editor",
		);
		assert.equal(edited.slug, first.slug);
		const rows = [getAdminProduct(db, first.id)];
		assert.equal(rows[0].sale_price_minor, 0);
		assert.equal(rows[0].images[0].url, "/images/ipl-kit-cutout.png");
		assert.equal(rows[0].images.length, 2);
		assert.deepEqual(rows[0].features, ["რეჟიმი"]);
		assert.equal(
			db
				.prepare("SELECT rowid FROM products_fts WHERE products_fts MATCH ?")
				.all('"შეცვლილი"*').length,
			1,
		);
		assert.equal(
			db
				.prepare(
					"SELECT username FROM admin_audit_log ORDER BY id DESC LIMIT 1",
				)
				.get().username,
			"editor",
		);
		assert.throws(() =>
			saveProduct(db, { ...product, sale_price_minor: 999999 }, "owner"),
		);
		assert.throws(() =>
			saveProduct(
				db,
				{ ...product, images: [{ url: "javascript:alert(1)", alt: "bad" }] },
				"owner",
			),
		);
		assert.throws(
			() => saveProduct(db, { ...product, category_slug: "missing" }, "owner"),
			(error) => error.status === 400,
		);
		assert.throws(
			() => saveProduct(db, { ...product, id: 999999 }, "owner"),
			(error) => error.status === 404,
		);
	} finally {
		db.close();
	}
});

test("categories can be reordered, renamed and hidden without changing slugs", () => {
	const db = database();
	try {
		const input = {
			name: "ტესტის კატეგორია",
			description: "აღწერა",
			icon: "smile",
			sort_order: 4,
			is_active: true,
		};
		const { slug } = saveCategory(db, input, "owner");
		saveCategory(
			db,
			{ ...input, slug, name: "სხვა სახელი", sort_order: 0, is_active: false },
			"owner",
		);
		const row = db.prepare("SELECT * FROM categories WHERE slug=?").get(slug);
		assert.equal(row.name, "სხვა სახელი");
		assert.equal(row.is_active, 0);
		assert.equal(row.sort_order, 0);
	} finally {
		db.close();
	}
});

test("GEL input converts exactly to tetri and rejects extra decimal places", () => {
	assert.equal(gelToMinor("19.99"), 1999);
	assert.equal(gelToMinor("0.01"), 1);
	assert.throws(() => gelToMinor("19.999"));
	assert.throws(() => gelToMinor("-1"));
});

test("product form preserves zero sale prices and normalizes optional fields", () => {
	const form = new FormData();
	for (const [key, value] of Object.entries({
		name: " Product ",
		brand: "Brand",
		category_slug: "skin",
		description: " Details ",
		price: "19.99",
		sale_price: "0",
		stock_status: "in_stock",
		status: "draft",
		features: " First \n\n Second ",
	}))
		form.set(key, value);
	const result = readProductForm(form, product.images, 12);
	assert.equal(result.id, 12);
	assert.equal(result.name, "Product");
	assert.equal(result.price_minor, 1999);
	assert.equal(result.sale_price_minor, 0);
	assert.equal(result.sku, null);
	assert.equal(result.is_featured, false);
	assert.deepEqual(result.features, ["First", "Second"]);
	assert.deepEqual(result.images, product.images);
	form.set("sale_price", "");
	form.set("is_featured", "on");
	assert.equal(readProductForm(form, []).sale_price_minor, null);
	assert.equal(readProductForm(form, []).is_featured, true);
	form.set("price", "1.999");
	assert.throws(() => readProductForm(form, []));
});
