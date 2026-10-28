import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { test } from "node:test";
import { finalPrice, money } from "../src/data/catalog.ts";

test("discounts are rounded to integer tetri", () => {
	assert.equal(finalPrice({ price_minor: 1999, discount_percent: 15 }), 1699);
	assert.equal(finalPrice({ price_minor: 105, discount_percent: 50 }), 53);
	assert.equal(finalPrice({ price_minor: 1999, discount_percent: 100 }), 0);
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
			"თმის-მოვლა",
			"თმის მოვლა",
		);
		const insert = db.prepare(
			"INSERT INTO products(slug,name,brand,category_slug,price_minor) VALUES(?,?,?,?,?)",
		);
		insert.run("საშრობი", "თმის საშრობი", "Beauty", "თმის-მოვლა", 1999);
		const search = (q) =>
			db
				.prepare("SELECT rowid FROM products_fts WHERE products_fts MATCH ?")
				.all(q);
		assert.equal(search('"საშ"*').length, 1);
		assert.equal(search('"Bea"*').length, 1);
		db.prepare("UPDATE products SET name=? WHERE id=1").run("ახალი სტაილერი");
		assert.equal(search('"საშ"*').length, 0);
		assert.equal(search('"სტაი"*').length, 1);
		assert.throws(() => insert.run("bad", "Bad", "", "missing", 100));
		assert.throws(() => insert.run("negative", "Bad", "", "თმის-მოვლა", -1));
		db.exec("DELETE FROM products WHERE id=1");
		assert.equal(search('"სტაი"*').length, 0);
	} finally {
		db.close();
	}
});
