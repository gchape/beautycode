import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { test } from "node:test";
import { categories, finalPrice } from "../src/data/catalog.ts";
import { filterProducts } from "../src/lib/catalog-search.ts";
import { migrateDatabase } from "../src/server/migrations.ts";

for (const existing of [false, true]) {
	test(`catalog migration ${existing ? "upgrades an existing" : "initializes a fresh"} database`, () => {
		const db = new DatabaseSync(":memory:");
		try {
			db.exec("PRAGMA foreign_keys=ON");
			if (existing) {
				db.exec(readFileSync("migrations/0001_init.sql", "utf8"));
				db.exec(
					"INSERT INTO categories(slug,name) VALUES('custom','Custom'); INSERT INTO products(slug,name,category_slug,price_minor) VALUES('custom','Keep me','custom',100); PRAGMA user_version=1",
				);
			}
			migrateDatabase(db);
			migrateDatabase(db);
			const products = db
				.prepare("SELECT * FROM products WHERE status='published' ORDER BY id")
				.all();
			assert.equal(products.length, 6);
			assert.deepEqual(
				products.map(finalPrice),
				[14900, 44900, 14900, 11900, 13000, 12900],
			);
			assert.equal(new Set(products.map((p) => p.image_url)).size, 6);
			for (const product of products) {
				assert.ok(categories.some((c) => c.slug === product.category_slug));
				assert.ok(product.description.length > 30);
				assert.ok(JSON.parse(product.features_json).length >= 3);
				assert.ok(existsSync(`public${product.image_url}`));
			}
			assert.equal(
				filterProducts(products, { category: "კანის-მოვლა" }).length,
				2,
			);
			assert.equal(filterProducts(products, { discount: true }).length, 5);
			assert.equal(filterProducts(products, { max: 130 }).length, 3);
			assert.equal(
				db
					.prepare("SELECT rowid FROM products_fts WHERE products_fts MATCH ?")
					.all('"ირიგატორი"*').length,
				1,
			);
			if (existing)
				assert.equal(
					db.prepare("SELECT name FROM products WHERE slug='custom'").get()
						.name,
					"Keep me",
				);
			assert.equal(db.prepare("PRAGMA user_version").get().user_version, 3);
		} finally {
			db.close();
		}
	});
}

test("exact sale prices override rounded discounts, including a zero sale price", () => {
	assert.equal(
		finalPrice({
			price_minor: 30000,
			discount_percent: 50,
			sale_price_minor: 14900,
		}),
		14900,
	);
	assert.equal(
		finalPrice({ price_minor: 100, discount_percent: 0, sale_price_minor: 0 }),
		0,
	);
});

test("descriptive search triggers synchronize product changes", () => {
	const db = new DatabaseSync(":memory:");
	try {
		db.exec(readFileSync("migrations/0001_init.sql", "utf8"));
		db.exec("PRAGMA user_version=1");
		migrateDatabase(db);
		const names = db
			.prepare(
				"SELECT name FROM sqlite_schema WHERE type IN ('trigger','index')",
			)
			.all()
			.map((row) => row.name);
		for (const name of [
			"products_search_after_insert",
			"products_search_after_delete",
			"products_search_after_update",
			"products_status_category_index",
		])
			assert.ok(names.includes(name));
		for (const name of [
			"products_ai",
			"products_ad",
			"products_au",
			"products_public_category",
		])
			assert.ok(!names.includes(name));
		const search = (word) =>
			db
				.prepare("SELECT rowid FROM products_fts WHERE products_fts MATCH ?")
				.all(word);
		assert.equal(search('"ირიგატორი"*').length, 1);
		db.exec(
			"INSERT INTO products(slug,name,category_slug,price_minor) VALUES('trigger-test','OriginalUnique','კანის-მოვლა',100)",
		);
		assert.equal(search("OriginalUnique").length, 1);
		db.exec(
			"UPDATE products SET name='UpdatedUnique' WHERE slug='trigger-test'",
		);
		assert.equal(search("OriginalUnique").length, 0);
		assert.equal(search("UpdatedUnique").length, 1);
		db.exec("DELETE FROM products WHERE slug='trigger-test'");
		assert.equal(search("UpdatedUnique").length, 0);
	} finally {
		db.close();
	}
});
