import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { requireAdmin } from "../src/server/admin/auth.ts";
import { saveDevelopmentImage } from "../src/server/local-storage.ts";
import { databasePath } from "../src/server/paths.ts";
import { presignImage, putBackup } from "../src/server/storage.ts";

test("development supports authenticated local uploads and backups; production rejects them", async () => {
	const env = { ...process.env };
	const cwd = process.cwd();
	const dir = await mkdtemp(join(tmpdir(), "beautycode-dev-"));
	try {
		process.chdir(dir);
		process.env.NODE_ENV = "development";
		delete process.env.DB_PATH;
		assert.equal(databasePath(), "data-dev/beautycode.db");
		process.env.DB_PATH = "custom.db";
		assert.equal(databasePath(), "custom.db");
		delete process.env.DB_PATH;
		delete process.env.DEV_ADMIN_PASSWORD;
		const authorization = `Basic ${Buffer.from("admin:admin").toString("base64")}`;
		const request = (headers = {}) =>
			new Request("http://localhost:3000/admin", { headers });
		assert.throws(
			() => requireAdmin(request({ "x-remote-user": "admin" })),
			(e) => e.status === 401 && e.headers.has("WWW-Authenticate"),
		);
		assert.equal(requireAdmin(request({ authorization })), "admin");
		assert.throws(
			() =>
				requireAdmin(
					new Request("http://localhost:3000/admin", {
						method: "POST",
						headers: { authorization, origin: "https://other.example" },
					}),
				),
			(e) => e.status === 403,
		);
		process.env.SITE_URL = "https://production.example";
		assert.equal(
			requireAdmin(
				new Request("http://localhost:3000/admin", {
					method: "POST",
					headers: { authorization, origin: "http://localhost:3000" },
				}),
			),
			"admin",
		);
		process.env.DEV_ADMIN_PASSWORD = "custom";
		assert.throws(
			() => requireAdmin(request({ authorization })),
			(e) => e.status === 401,
		);
		assert.equal(
			requireAdmin(
				request({
					authorization: `Basic ${Buffer.from("admin:custom").toString("base64")}`,
				}),
			),
			"admin",
		);
		const signed = await presignImage({ type: "image/png", size: 3 });
		assert.equal(signed.url, "/admin/api/uploads");
		const form = new FormData();
		form.append(
			"file",
			new Blob(["png"], { type: "image/png" }),
			"../../evil.png",
		);
		const uploaded = await saveDevelopmentImage(
			new Request("http://localhost:3000/admin/api/uploads", {
				method: "POST",
				body: form,
			}),
		);
		assert.match(uploaded.imageUrl, /^\/images\/dev-[\w-]+\.png$/);
		assert.equal(await readFile(`public${uploaded.imageUrl}`, "utf8"), "png");
		const invalid = new FormData();
		invalid.append(
			"file",
			new Blob(["<script>"], { type: "image/svg+xml" }),
			"bad.svg",
		);
		await assert.rejects(() =>
			saveDevelopmentImage(
				new Request("http://localhost:3000/admin/api/uploads", {
					method: "POST",
					body: invalid,
				}),
			),
		);
		await putBackup("backups/latest.json", '{"ok":true}');
		assert.equal(await readFile("backups/latest.json", "utf8"), '{"ok":true}');
		await assert.rejects(() => putBackup("backups/../../bad.json", "bad"));
		process.env.NODE_ENV = "production";
		assert.equal(databasePath(), "data/beautycode.db");
		assert.throws(
			() => requireAdmin(request({ authorization })),
			(e) => e.status === 401,
		);
		await assert.rejects(
			() => saveDevelopmentImage(request()),
			(e) => e.status === 404,
		);
	} finally {
		process.chdir(cwd);
		process.env = env;
		await rm(dir, { recursive: true, force: true });
	}
});
