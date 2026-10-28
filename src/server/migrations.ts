import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { DatabaseSync } from "node:sqlite";

const migrations = [
	"0001_init.sql",
	"0002_product_catalog.sql",
	"0003_admin_catalog.sql",
];

export function migrateDatabase(db: DatabaseSync) {
	db.exec("BEGIN IMMEDIATE");
	try {
		const { user_version } = db.prepare("PRAGMA user_version").get() as {
			user_version: number;
		};
		for (let version = user_version; version < migrations.length; version++) {
			db.exec(readFileSync(resolve("migrations", migrations[version]), "utf8"));
			db.exec(`PRAGMA user_version=${version + 1}`);
		}
		db.exec("COMMIT");
	} catch (error) {
		db.exec("ROLLBACK");
		throw error;
	}
}
