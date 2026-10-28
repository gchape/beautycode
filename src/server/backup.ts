import type { DatabaseSync, SQLInputValue } from "node:sqlite";
import { z } from "zod";

export const backupTables = [
	"categories",
	"products",
	"product_images",
	"admin_audit_log",
] as const;
const rowSchema = z.record(
	z.string().regex(/^[a-z_]+$/),
	z.union([z.string(), z.number().finite(), z.null()]),
);
const backupSchema = z.object({
	version: z.literal(1),
	schemaVersion: z.number().int(),
	exportedAt: z.string(),
	tables: z
		.object({
			categories: z.array(rowSchema),
			products: z.array(rowSchema),
			product_images: z.array(rowSchema),
			admin_audit_log: z.array(rowSchema),
		})
		.strict(),
});
export function exportBackup(db: DatabaseSync) {
	db.exec("BEGIN");
	try {
		const tables = Object.fromEntries(
			backupTables.map((table) => [
				table,
				db.prepare(`SELECT * FROM ${table}`).all(),
			]),
		);
		const schemaVersion = db.prepare("PRAGMA user_version").get()?.user_version;
		db.exec("COMMIT");
		return JSON.stringify(
			{
				version: 1,
				schemaVersion,
				exportedAt: new Date().toISOString(),
				tables,
			},
			null,
			2,
		);
	} catch (error) {
		db.exec("ROLLBACK");
		throw error;
	}
}
export function restoreBackup(db: DatabaseSync, raw: string) {
	const backup = backupSchema.parse(JSON.parse(raw));
	if (
		backup.schemaVersion !==
		db.prepare("PRAGMA user_version").get()?.user_version
	)
		throw new Error("Backup schema version does not match this application");
	db.exec("PRAGMA foreign_keys=ON; BEGIN IMMEDIATE");
	try {
		for (const table of [...backupTables].reverse())
			db.exec(`DELETE FROM ${table}`);
		for (const table of backupTables)
			restoreTable(db, table, backup.tables[table]);
		for (const row of db.prepare("SELECT features_json FROM products").all())
			z.array(z.string()).parse(JSON.parse(String(row.features_json)));
		db.exec("INSERT INTO products_fts(products_fts) VALUES('rebuild')");
		if (db.prepare("PRAGMA foreign_key_check").all().length)
			throw new Error("Invalid backup references");
		db.exec("COMMIT");
	} catch (error) {
		db.exec("ROLLBACK");
		throw error;
	}
}
export async function createBackup(db: DatabaseSync) {
	const { putBackup } = await import("./storage.ts");
	const json = exportBackup(db);
	const key = `backups/beautycode-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
	await putBackup(key, json);
	await putBackup("backups/latest.json", json);
	return { key };
}

function restoreTable(
	db: DatabaseSync,
	table: (typeof backupTables)[number],
	rows: z.infer<typeof rowSchema>[],
) {
	const allowed = db
		.prepare(`PRAGMA table_info(${table})`)
		.all()
		.map((c) => String(c.name));
	for (const row of rows) {
		const columns = Object.keys(row);
		if (
			columns.length !== allowed.length ||
			columns.some((c) => !allowed.includes(c))
		)
			throw new Error(`Invalid columns in ${table}`);
		db.prepare(
			`INSERT INTO ${table} (${columns.join(",")}) VALUES (${columns.map(() => "?").join(",")})`,
		).run(...(Object.values(row) as SQLInputValue[]));
	}
}
