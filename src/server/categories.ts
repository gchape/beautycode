import type { DatabaseSync } from "node:sqlite";
import type { Category } from "../data/catalog.ts";

export function queryCategories(
	db: DatabaseSync,
	{ includeInactive = false } = {},
): Category[] {
	const rows = db
		.prepare(
			`SELECT slug, name, description, icon, sort_order, is_active FROM categories ${includeInactive ? "" : "WHERE is_active=1"} ORDER BY sort_order, slug`,
		)
		.all();
	return rows.map((row) => ({
		...row,
		is_active: Boolean(row.is_active),
	})) as unknown as Category[];
}
