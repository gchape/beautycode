import { randomUUID } from "node:crypto";
import { mkdir, open, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { backup, DatabaseSync } from "node:sqlite";
import { databasePath, isDevelopment } from "./config.ts";
import { latestSchemaVersion } from "./migrations.ts";

// Fails with EEXIST if the path is taken, so nothing is ever overwritten.
async function reserveFile(path: string) {
	await mkdir(dirname(path), { recursive: true });
	await (await open(path, "wx", 0o600)).close();
}

export async function writeSnapshot(db: DatabaseSync, path: string) {
	if (path.endsWith(".json"))
		throw new Error("Use a .db path for SQLite snapshots, not .json");
	await reserveFile(path);
	try {
		await backup(db, path);
	} catch (error) {
		await rm(path, { force: true });
		throw error;
	}
}

export async function createBackup(db: DatabaseSync) {
	const stamp = new Date().toISOString().replace(/[:.]/g, "-");
	const name = `beautycode-${stamp}-${randomUUID().slice(0, 8)}.db`;
	const path = join(dirname(databasePath()), "backups", name);
	const key = `backups/${name}`;

	await writeSnapshot(db, path);
	if (isDevelopment()) return { key, path };

	const { uploadBackup } = await import("./storage.ts");
	await uploadBackup(key, path);
	await rm(path);
	return { key, path: undefined };
}

function validateSnapshot(db: DatabaseSync) {
	if (
		db.prepare("PRAGMA user_version").get()?.user_version !==
		latestSchemaVersion
	)
		throw new Error("Backup schema version does not match this application");

	// "ok" is only ever returned as a single row, so the first row is enough.
	if (db.prepare("PRAGMA integrity_check").get()?.integrity_check !== "ok")
		throw new Error("Backup database integrity check failed");

	if (db.prepare("PRAGMA foreign_key_check").get())
		throw new Error("Backup has invalid references");

	// Reject unrelated SQLite files even if their version happens to match.
	db.exec(`
		SELECT p.id, c.slug, i.url, a.username
			FROM products p, categories c, product_images i, admin_audit_log a LIMIT 0;
		SELECT rowid FROM products_fts LIMIT 0;
	`);
}

/** Returns the path of a safety copy of the existing target, if there was one. */
async function prepareRestoreTarget(target: string) {
	try {
		await reserveFile(target);
		return undefined;
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
	}

	const current = new DatabaseSync(target, { readOnly: true });
	try {
		const safety = `${target}.before-restore-${randomUUID()}.db`;
		await writeSnapshot(current, safety);
		return safety;
	} finally {
		current.close();
	}
}

// The application must be stopped. SQLite handles target WAL files and commits
// the replacement itself; do not copy or delete live database/WAL files manually.
export async function restoreSnapshot(source: string, target: string) {
	if (resolve(source) === resolve(target))
		throw new Error("Backup and database paths must differ");

	const snapshot = new DatabaseSync(source, { readOnly: true });
	try {
		validateSnapshot(snapshot);
		const safety = await prepareRestoreTarget(target);
		await backup(snapshot, target);
		return { safety };
	} finally {
		snapshot.close();
	}
}
