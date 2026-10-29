import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { databasePath } from "./config.ts";
import { migrateDatabase } from "./migrations.ts";

let database: DatabaseSync | undefined;

function openDatabase() {
	const path = resolve(databasePath());
	mkdirSync(dirname(path), { recursive: true });

	const db = new DatabaseSync(path);
	try {
		db.exec(`
			PRAGMA busy_timeout = 5000;
			PRAGMA journal_mode = WAL;
			PRAGMA synchronous = NORMAL;
		`);
		migrateDatabase(db);
		db.prepare("SELECT 1 FROM products_fts LIMIT 1").get(); // fail fast if FTS is broken
		return db;
	} catch (error) {
		db.close();
		throw error;
	}
}

export function getDatabase() {
	database ??= openDatabase();
	return database;
}
