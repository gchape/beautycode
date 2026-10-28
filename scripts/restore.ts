import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { restoreSnapshot } from "../src/server/backup.ts";
import { databasePath } from "../src/server/config.ts";

const [source, confirmation] = process.argv.slice(2);
if (!source || confirmation !== "--replace")
	throw new Error(
		"Stop the app, then run: node scripts/restore.ts <local.db|s3:backups/key.db> --replace",
	);
const temporary = source.startsWith("s3:")
	? await mkdtemp(join(tmpdir(), "beautycode-restore-"))
	: undefined;
try {
	let path = source;
	if (temporary) {
		const { downloadBackup } = await import("../src/server/storage.ts");
		path = join(temporary, "snapshot.db");
		await downloadBackup(source.slice(3), path);
	}
	const { safety } = await restoreSnapshot(path, databasePath());
	console.log(
		safety ? `Restored. Previous database saved to ${safety}` : "Restored.",
	);
} finally {
	if (temporary) await rm(temporary, { recursive: true, force: true });
}
