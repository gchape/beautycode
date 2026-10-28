import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { test } from "node:test";
import { discountPercent, finalPrice, money } from "../src/data/catalog.ts";

test("prices use exact tetri and discounts are derived from sale prices", () => {
	assert.equal(finalPrice({ price_minor: 1999, sale_price_minor: 1699 }), 1699);
	assert.equal(finalPrice({ price_minor: 105, sale_price_minor: 53 }), 53);
	assert.equal(finalPrice({ price_minor: 1999, sale_price_minor: 0 }), 0);
	assert.equal(
		discountPercent({ price_minor: 1999, sale_price_minor: 1699 }),
		15,
	);
	assert.equal(finalPrice({ price_minor: 1999, sale_price_minor: null }), 1999);
	assert.match(money(1699), /16[.,]99/);
});
test("migration supports Georgian prefix search and synchronizes edits/deletes", () => {
	const db = new DatabaseSync(":memory:");
	try {
		db.exec("PRAGMA foreign_keys=ON");
		db.exec(
			readFileSync(
				new URL("../migrations/0001_init.sql", import.meta.url),
				"utf8",
			),
		);
		db.prepare("INSERT INTO categories(slug,name) VALUES(?,?)").run(
			"test-category",
			"თმის მოვლა",
		);
		const insert = db.prepare(
			"INSERT INTO products(slug,name,brand,category_slug,price_minor) VALUES(?,?,?,?,?)",
		);
		insert.run("საშრობი", "თმის საშრობი", "TestBrand", "test-category", 1999);
		const search = (q) =>
			db
				.prepare("SELECT rowid FROM products_fts WHERE products_fts MATCH ?")
				.all(q);
		assert.equal(search('"საშ"*').length, 1);
		assert.equal(search('"TestBra"*').length, 1);
		db.prepare("UPDATE products SET name=? WHERE slug='საშრობი'").run(
			"ახალი სტაილერი",
		);
		assert.equal(search('"საშ"*').length, 0);
		assert.equal(search('"სტაი"*').length, 1);
		assert.throws(() => insert.run("bad", "Bad", "", "missing", 100));
		assert.throws(() => insert.run("negative", "Bad", "", "test-category", -1));
		db.exec("DELETE FROM products WHERE slug='საშრობი'");
		assert.equal(search('"სტაი"*').length, 0);
	} finally {
		db.close();
	}
});
