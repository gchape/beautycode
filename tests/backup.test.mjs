import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { test } from "node:test";
import { exportBackup, restoreBackup } from "../src/server/backup.ts";
import { migrateDatabase } from "../src/server/migrations.ts";

test("JSON backup round trip restores products, galleries and FTS; invalid restore rolls back", () => {
	const db = new DatabaseSync(":memory:");
	try {
		db.exec("PRAGMA foreign_keys=ON");
		migrateDatabase(db);
		const backup = exportBackup(db);
		db.exec("UPDATE products SET name='Changed'; DELETE FROM product_images");
		restoreBackup(db, backup);
		assert.equal(
			db.prepare("SELECT count(*) AS count FROM products").get().count,
			6,
		);
		assert.equal(
			db.prepare("SELECT count(*) AS count FROM product_images").get().count,
			6,
		);
		assert.equal(
			db
				.prepare("SELECT rowid FROM products_fts WHERE products_fts MATCH ?")
				.all('"ირიგატორი"*').length,
			1,
		);
		const before = db.prepare("SELECT * FROM products ORDER BY id").all();
		const invalid = JSON.parse(backup);
		invalid.tables.products[0].category_slug = "missing-category";
		assert.throws(() => restoreBackup(db, JSON.stringify(invalid)));
		assert.deepEqual(
			db.prepare("SELECT * FROM products ORDER BY id").all(),
			before,
		);
		invalid.tables.products[0].category_slug = before[0].category_slug;
		invalid.tables.products[0].features_json = "not-json";
		assert.throws(() => restoreBackup(db, JSON.stringify(invalid)));
		assert.deepEqual(
			db.prepare("SELECT * FROM products ORDER BY id").all(),
			before,
		);
		invalid.schemaVersion = 999;
		assert.throws(
			() => restoreBackup(db, JSON.stringify(invalid)),
			/schema version/,
		);
	} finally {
		db.close();
	}
});
