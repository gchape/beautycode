import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { exportBackup, restoreBackup } from "../src/server/backup.ts";
import { migrateDatabase } from "../src/server/migrations.ts";
import { databasePath } from "../src/server/paths.ts";
import { getBackup } from "../src/server/storage.ts";

const [source, confirmation] = process.argv.slice(2);
if (!source || confirmation !== "--replace")
	throw new Error(
		"Stop the app, then run: node scripts/restore.ts <local.json|s3:backups/key.json> --replace",
	);
const raw = source.startsWith("s3:")
	? await getBackup(source.slice(3))
	: readFileSync(source, "utf8");
const path = databasePath();
mkdirSync(dirname(path), { recursive: true });
const db = new DatabaseSync(path);
try {
	migrateDatabase(db);
	const safety = `${path}.before-restore-${Date.now()}.json`;
	writeFileSync(safety, exportBackup(db), { mode: 0o600 });
	restoreBackup(db, raw);
	console.log(`Restored. Previous data saved to ${safety}`);
} finally {
	db.close();
}
