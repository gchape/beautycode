import { randomUUID } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { exportBackup } from "../src/server/backup.ts";
import { databasePath } from "../src/server/paths.ts";
import { s3 } from "../src/server/storage.ts";

const bucket = process.env.S3_IMAGES_BUCKET;
const base = process.env.IMAGES_BASE_URL?.replace(/\/$/, "");
if (!bucket || !base)
	throw new Error("Set S3_IMAGES_BUCKET and IMAGES_BASE_URL");
const path = databasePath();
const db = new DatabaseSync(path);
try {
	db.exec("PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000");
	const snapshot = `${path}.before-image-publish-${Date.now()}.json`;
	writeFileSync(snapshot, exportBackup(db), { mode: 0o600 });
	const local = db
		.prepare(
			"SELECT url FROM product_images WHERE url LIKE '/images/%' UNION SELECT image_url AS url FROM products WHERE image_url LIKE '/images/%'",
		)
		.all();
	const replacements = new Map<string, string>();
	for (const row of local) {
		const url = String(row.url);
		if (!/^\/images\/[a-zA-Z0-9._-]+\.(png|jpg|jpeg|webp)$/.test(url))
			throw new Error(`Unsupported image: ${url}`);
		const source = [
			resolve("public", url.slice(1)),
			resolve(".output/public", url.slice(1)),
		].find(existsSync);
		if (!source) throw new Error(`Missing image: ${url}`);
		const extension = url.split(".").pop();
		const key = `products/${randomUUID()}.${extension}`;
		await (await s3()).send(
			new PutObjectCommand({
				Bucket: bucket,
				Key: key,
				Body: readFileSync(source),
				ContentType:
					extension === "webp"
						? "image/webp"
						: extension === "png"
							? "image/png"
							: "image/jpeg",
				CacheControl: "public,max-age=31536000,immutable",
			}),
		);
		replacements.set(url, `${base}/${key}`);
	}
	db.exec("BEGIN IMMEDIATE");
	try {
		for (const [before, after] of replacements) {
			db.prepare("UPDATE product_images SET url=? WHERE url=?").run(
				after,
				before,
			);
			db.prepare(
				"UPDATE products SET image_url=?,updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE image_url=?",
			).run(after, before);
		}
		db.prepare(
			"INSERT INTO admin_audit_log(username,action,entity,entity_id) VALUES('deployment','publish-images','catalog',?)",
		).run(String(replacements.size));
		db.exec("COMMIT");
	} catch (error) {
		db.exec("ROLLBACK");
		throw error;
	}
	console.log(
		`Published ${replacements.size} catalog images. Previous data: ${snapshot}`,
	);
} finally {
	db.close();
}
