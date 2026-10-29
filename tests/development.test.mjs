import assert from "node:assert/strict";
import { test } from "node:test";
import { requireAdmin } from "../src/server/admin/auth.ts";
import { databasePath } from "../src/server/config.ts";

test("development admin can write to an isolated local database", async () => {
	const env = { ...process.env };
	try {
		process.env.NODE_ENV = "development";
		delete process.env.DB_PATH;
		assert.equal(databasePath(), "data-dev/beautycode.db");
		const url = "http://localhost:3000/admin/api/products";
		assert.equal(requireAdmin(new Request(url)), "dev");
		assert.equal(
			requireAdmin(
				new Request(url, {
					method: "POST",
					headers: { origin: "http://localhost:3000" },
				}),
			),
			"dev",
		);
		assert.throws(
			() =>
				requireAdmin(
					new Request(url, {
						method: "POST",
						headers: { origin: "https://attacker.example" },
					}),
				),
			(e) => e.status === 403,
		);
		process.env.NODE_ENV = "production";
		assert.throws(
			() => requireAdmin(new Request(url)),
			(e) => e.status === 401,
		);
	} finally {
		process.env = env;
	}
});
