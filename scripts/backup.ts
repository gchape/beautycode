import { DatabaseSync } from "node:sqlite";
import { createBackup, writeSnapshot } from "../src/server/backup.ts";
import { databasePath } from "../src/server/config.ts";

const db = new DatabaseSync(databasePath(), { readOnly: true });
try {
	const output = process.argv[2];
	if (output) {
		await writeSnapshot(db, output);
		console.log(`Backup saved: ${output}`);
	} else console.log(await createBackup(db));
} finally {
	db.close();
}
