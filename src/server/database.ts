import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { Category, Product } from "../data/catalog";
import { hydrateProducts } from "./admin/repository";
import { migrateDatabase } from "./migrations";
import { databasePath } from "./paths.ts";

let database: DatabaseSync | undefined;

export function getDatabase() {
	if (database) return database;
	const path = resolve(databasePath());
	mkdirSync(dirname(path), { recursive: true });
	const db = new DatabaseSync(path);
	try {
		db.exec(
			"PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; PRAGMA synchronous=NORMAL; PRAGMA foreign_keys=ON;",
		);
		migrateDatabase(db);
		db.prepare("SELECT count(*) FROM products_fts").get();
		database = db;
		return db;
	} catch (error) {
		db.close();
		throw error;
	}
}

export function readProducts(query = ""): Product[] {
	const tokens = query.slice(0, 200).match(/[\p{L}\p{N}]+/gu) || [];
	const base = `SELECT p.* FROM products p JOIN categories c ON c.slug=p.category_slug WHERE p.status='published' AND c.is_active=1`;
	const search = tokens.map((token) => `"${token}"*`).join(" AND ");
	const querySql = tokens.length
		? `${base} AND p.id IN (SELECT rowid FROM products_fts WHERE products_fts MATCH ?) ORDER BY p.id DESC`
		: `${base} ORDER BY p.id DESC`;
	const rows = getDatabase()
		.prepare(querySql)
		.all(...(tokens.length ? [search] : []));
	return hydrateProducts(getDatabase(), rows);
}
export function readCategories(): Category[] {
	return getDatabase()
		.prepare(
			"SELECT * FROM categories WHERE is_active=1 ORDER BY sort_order,slug",
		)
		.all() as unknown as Category[];
}
