import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { databasePath } from "./config.ts";
import { migrateDatabase } from "./migrations.ts";

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
