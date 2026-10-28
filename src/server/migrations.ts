import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import { withTransaction } from "./transaction.ts";

// Native scripts resolve from this module; bundled deployments supply MIGRATIONS_DIR.
const migrationsDir = process.env.MIGRATIONS_DIR
	? resolve(process.env.MIGRATIONS_DIR)
	: fileURLToPath(new URL("../../migrations/", import.meta.url));

const migrations = readdirSync(migrationsDir)
	.filter((file) => file.endsWith(".sql"))
	.sort();

export const latestSchemaVersion = migrations.length;

export function migrateDatabase(db: DatabaseSync) {
	withTransaction(db, () => {
		const { user_version } = db.prepare("PRAGMA user_version").get() as {
			user_version: number;
		};
		migrations.slice(user_version).forEach((file, index) => {
			db.exec(readFileSync(join(migrationsDir, file), "utf8"));
			db.exec(`PRAGMA user_version=${user_version + index + 1}`);
		});
	});
}
