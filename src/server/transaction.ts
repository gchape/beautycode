import type { DatabaseSync } from "node:sqlite";

/** Runs `fn` in an immediate transaction; rolls back and rethrows on any error. */
export function withTransaction<T>(db: DatabaseSync, fn: () => T): T {
	db.exec("BEGIN IMMEDIATE");
	try {
		const result = fn();
		db.exec("COMMIT");
		return result;
	} catch (error) {
		db.exec("ROLLBACK");
		throw error;
	}
}
