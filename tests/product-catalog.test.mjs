import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { test } from "node:test";
import { coverImage, finalPrice } from "../src/data/catalog.ts";
import { filterProducts } from "../src/lib/catalog-search.ts";
import { queryCategories } from "../src/server/categories.ts";
import {
	latestSchemaVersion,
	migrateDatabase,
} from "../src/server/migrations.ts";
import { queryPublicProducts } from "../src/server/products.ts";

test("catalog migration initializes a fresh database and runs only once", () => {
	const db = new DatabaseSync(":memory:");
	try {
		db.exec("PRAGMA foreign_keys=ON");
		migrateDatabase(db);
		migrateDatabase(db);
		const categories = queryCategories(db);
		const products = queryPublicProducts(db).sort((a, b) => a.id - b.id);
		assert.equal(products.length, 6);
		assert.deepEqual(
			products.map(finalPrice),
			[14900, 44900, 14900, 11900, 13000, 12900],
		);
		assert.equal(new Set(products.map(coverImage)).size, 6);
		for (const product of products) {
			assert.ok(categories.some((c) => c.slug === product.category_slug));
			assert.ok(product.description.length > 30);
			assert.ok(product.features.length >= 3);
			assert.ok(existsSync(`public${coverImage(product)}`));
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
		assert.equal(
			db.prepare("PRAGMA user_version").get().user_version,
			latestSchemaVersion,
		);
	} finally {
		db.close();
	}
});

test("exact sale prices include a zero sale price", () => {
	assert.equal(
		finalPrice({
			price_minor: 30000,
			sale_price_minor: 14900,
		}),
		14900,
	);
	assert.equal(finalPrice({ price_minor: 100, sale_price_minor: 0 }), 0);
});

test("descriptive search triggers synchronize product changes", () => {
	const db = new DatabaseSync(":memory:");
	try {
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

test("pre-consolidation database versions fail before changing data", () => {
	const db = new DatabaseSync(":memory:");
	try {
		db.exec(
			"CREATE TABLE preserved(value TEXT); INSERT INTO preserved VALUES('Keep me'); PRAGMA user_version=3",
		);
		assert.throws(() => migrateDatabase(db), /fresh database/);
		assert.equal(
			db.prepare("SELECT value FROM preserved").get().value,
			"Keep me",
		);
		assert.equal(db.prepare("PRAGMA user_version").get().user_version, 3);
		assert.equal(
			db.prepare("SELECT name FROM sqlite_schema WHERE name='products'").get(),
			undefined,
		);
	} finally {
		db.close();
	}
});
