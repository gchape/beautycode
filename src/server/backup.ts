import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, open, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { backup, DatabaseSync } from "node:sqlite";
import { databasePath, isDevelopment } from "./config.ts";
import { latestSchemaVersion } from "./migrations.ts";

export async function writeSnapshot(db: DatabaseSync, path: string) {
	if (path.endsWith(".json"))
		throw new Error("Use a .db path for SQLite snapshots, not .json");
	await mkdir(dirname(path), { recursive: true });
	// Reserve a new private file; never overwrite an existing database or backup.
	const file = await open(path, "wx", 0o600);
	await file.close();
	try {
		await backup(db, path);
	} catch (error) {
		await rm(path, { force: true });
		throw error;
	}
}

export async function createBackup(db: DatabaseSync) {
	const development = isDevelopment();
	const name = `beautycode-${new Date().toISOString().replace(/[:.]/g, "-")}-${randomUUID().slice(0, 8)}.db`;
	const path = join(dirname(databasePath()), "backups", name);
	const key = `backups/${name}`;
	await writeSnapshot(db, path);
	if (!development) {
		const { uploadBackup } = await import("./storage.ts");
		await uploadBackup(key, path);
		await rm(path);
	}
	return { key, path: development ? path : undefined };
}

function validateSnapshot(db: DatabaseSync) {
	if (
		db.prepare("PRAGMA user_version").get()?.user_version !==
		latestSchemaVersion
	)
		throw new Error("Backup schema version does not match this application");
	const checks = db.prepare("PRAGMA integrity_check").all();
	if (checks.length !== 1 || checks[0].integrity_check !== "ok")
		throw new Error("Backup database integrity check failed");
	if (db.prepare("PRAGMA foreign_key_check").all().length)
		throw new Error("Backup has invalid references");
	// Reject unrelated SQLite files even if their version happens to match.
	db.prepare(
		"SELECT p.id, c.slug, i.url, a.username FROM products p, categories c, product_images i, admin_audit_log a LIMIT 0",
	).all();
	db.prepare("SELECT rowid FROM products_fts LIMIT 0").all();
}

async function prepareRestoreTarget(target: string) {
	await mkdir(dirname(target), { recursive: true });
	if (!existsSync(target)) {
		const file = await open(target, "wx", 0o600);
		await file.close();
		return undefined;
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
