import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
	mkdtemp,
	readdir,
	readFile,
	rm,
	stat,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { test } from "node:test";
import {
	createBackup,
	restoreSnapshot,
	writeSnapshot,
} from "../src/server/backup.ts";
import { migrateDatabase } from "../src/server/migrations.ts";

async function fixture(t) {
	const dir = await mkdtemp(join(tmpdir(), "beautycode-backup-"));
	t.after(() => rm(dir, { recursive: true, force: true }));
	return dir;
}
function openCatalog(path) {
	const db = new DatabaseSync(path);
	db.exec("PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON");
	migrateDatabase(db);
	return db;
}

test("SQLite snapshots include WAL writes, schema, galleries, audit, triggers and FTS", async (t) => {
	const dir = await fixture(t);
	const target = join(dir, "catalog.db");
	const snapshot = join(dir, "snapshot.db");
	let db = openCatalog(target);
	try {
		db.exec(
			"UPDATE products SET name='Snapshot Product' WHERE id=1; INSERT INTO admin_audit_log(username,action,entity,entity_id) VALUES('admin','update','product','1'); CREATE TABLE extra(value TEXT); INSERT INTO extra VALUES('preserved')",
		);
		await writeSnapshot(db, snapshot);
		assert.equal((await stat(snapshot)).mode & 0o777, 0o600);
		db.exec(
			"UPDATE products SET name='Changed' WHERE id=1; DELETE FROM product_images",
		);
	} finally {
		db.close();
	}
	const { safety } = await restoreSnapshot(snapshot, target);
	const previous = new DatabaseSync(safety, { readOnly: true });
	try {
		assert.equal(
			previous.prepare("SELECT name FROM products WHERE id=1").get().name,
			"Changed",
		);
	} finally {
		previous.close();
	}
	db = new DatabaseSync(target);
	try {
		assert.equal(
			db.prepare("SELECT name FROM products WHERE id=1").get().name,
			"Snapshot Product",
		);
		assert.equal(
			db.prepare("SELECT count(*) AS n FROM product_images").get().n,
			6,
		);
		assert.equal(
			db.prepare("SELECT count(*) AS n FROM admin_audit_log").get().n,
			1,
		);
		assert.equal(
			db.prepare("SELECT value FROM extra").get().value,
			"preserved",
		);
		assert.equal(
			db
				.prepare(
					"SELECT rowid FROM products_fts WHERE products_fts MATCH 'Snapshot'",
				)
				.all().length,
			1,
		);
		db.exec("UPDATE products SET name='Trigger Works' WHERE id=1");
		assert.equal(
			db
				.prepare(
					"SELECT rowid FROM products_fts WHERE products_fts MATCH 'Trigger'",
				)
				.all().length,
			1,
		);
	} finally {
		db.close();
	}
	const fresh = join(dir, "new", "catalog.db");
	assert.equal((await restoreSnapshot(snapshot, fresh)).safety, undefined);
	assert.equal((await stat(fresh)).mode & 0o777, 0o600);
});

test("invalid snapshots leave the existing database untouched", async (t) => {
	const dir = await fixture(t);
	const target = join(dir, "catalog.db");
	const invalid = join(dir, "invalid.db");
	const db = openCatalog(target);
	db.close();
	const before = await readFile(target);
	await writeFile(invalid, "not sqlite");
	await assert.rejects(() => restoreSnapshot(invalid, target));
	await rm(invalid);
	const wrongVersion = openCatalog(invalid);
	wrongVersion.exec("PRAGMA user_version=999");
	wrongVersion.close();
	await assert.rejects(
		() => restoreSnapshot(invalid, target),
		/schema version/,
	);
	assert.deepEqual(await readFile(target), before);
	assert.equal(
		(await readdir(dir)).some((name) => name.includes("before-restore")),
		false,
	);
	await assert.rejects(
		() => restoreSnapshot(target, target),
		/paths must differ/,
	);
	await assert.rejects(
		() => restoreSnapshot(join(dir, "old.json"), target),
		/Legacy JSON/,
	);
	const source = new DatabaseSync(target);
	try {
		await assert.rejects(() => writeSnapshot(source, target), /EEXIST/);
	} finally {
		source.close();
	}
});

test("foreign-key violations are rejected before replacing catalog data", async (t) => {
	const dir = await fixture(t);
	const path = join(dir, "broken.db");
	const db = openCatalog(path);
	db.exec(
		"PRAGMA foreign_keys=OFF; UPDATE products SET category_slug='missing' WHERE id=1",
	);
	db.close();
	await assert.rejects(
		() => restoreSnapshot(path, join(dir, "target.db")),
		/invalid references/,
	);
});

test("development creates unique local snapshots without latest copies or AWS", async (t) => {
	const dir = await fixture(t);
	const env = { ...process.env };
	t.after(() => {
		process.env = env;
	});
	process.env.NODE_ENV = "development";
	process.env.DB_PATH = join(dir, "catalog.db");
	const db = openCatalog(process.env.DB_PATH);
	try {
		const first = await createBackup(db);
		const second = await createBackup(db);
		assert.notEqual(first.key, second.key);
		assert.match(first.path, /backups\/beautycode-.*\.db$/);
		assert.equal((await readdir(join(dir, "backups"))).length, 2);
		process.env.NODE_ENV = "production";
		delete process.env.S3_BACKUPS_BUCKET;
		await assert.rejects(() => createBackup(db), /S3_BACKUPS_BUCKET/);
		assert.equal((await readdir(join(dir, "backups"))).length, 3);
	} finally {
		db.close();
	}
});

test("CLI backup and restore use the same database path and require explicit replacement", async (t) => {
	const dir = await fixture(t);
	const target = join(dir, "catalog.db");
	const snapshot = join(dir, "cli.db");
	const db = openCatalog(target);
	db.close();
	const options = {
		env: { ...process.env, NODE_ENV: "development", DB_PATH: target },
		encoding: "utf8",
		stdio: "pipe",
	};
	execFileSync(process.execPath, ["scripts/backup.ts", snapshot], options);
	assert.throws(
		() =>
			execFileSync(process.execPath, ["scripts/restore.ts", snapshot], options),
		/Stop the app/,
	);
	const output = execFileSync(
		process.execPath,
		["scripts/restore.ts", snapshot, "--replace"],
		options,
	);
	assert.match(output, /Previous database saved/);
});

test("startup migrations do not reseed or overwrite edited catalog data", () => {
	const db = openCatalog(":memory:");
	try {
		db.exec(
			"UPDATE products SET name='Edited', status='draft' WHERE id=1; UPDATE categories SET name='Renamed', is_active=0",
		);
		migrateDatabase(db);
		assert.equal(
			db.prepare("SELECT name FROM products WHERE id=1").get().name,
			"Edited",
		);
		assert.equal(db.prepare("SELECT count(*) AS n FROM products").get().n, 6);
		assert.equal(
			db.prepare("SELECT count(*) AS n FROM categories WHERE is_active=0").get()
				.n,
			4,
		);
	} finally {
		db.close();
	}
});
