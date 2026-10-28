import { writeFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { createBackup, exportBackup } from "../src/server/backup.ts";
import { databasePath } from "../src/server/paths.ts";

const db = new DatabaseSync(databasePath(), {
	readOnly: true,
});
try {
	const output = process.argv[2];
	if (output) {
		writeFileSync(output, exportBackup(db), { mode: 0o600 });
		console.log(`Backup saved: ${output}`);
	} else console.log(await createBackup(db));
} finally {
	db.close();
}
