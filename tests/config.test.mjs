import assert from "node:assert/strict";
import { test } from "node:test";
import {
	readServerEnvironment,
	validateProductionEnvironment,
} from "../src/server/config.ts";

test("parses typed defaults and coerces the port", () => {
	const env = readServerEnvironment({ NODE_ENV: "development", PORT: "3210" });
	assert.equal(env.NODE_ENV, "development");
	assert.equal(env.PORT, 3210);
	assert.equal(env.DB_PATH, undefined);
	assert.equal(readServerEnvironment({}).NODE_ENV, undefined);
});

test("rejects invalid URLs and non-numeric ports with readable variable names", () => {
	assert.throws(
		() => readServerEnvironment({ SITE_URL: "http://beautycode.ge/" }),
		/Invalid server environment:[\s\S]*SITE_URL/,
	);
	assert.throws(
		() => readServerEnvironment({ PORT: "three-thousand" }),
		/Invalid server environment:[\s\S]*PORT/,
	);
});

test("requires runtime storage and backup settings in production", () => {
	assert.throws(
		() => validateProductionEnvironment({ NODE_ENV: "production" }),
		/DB_PATH, UPLOADS_DIR, SITE_URL, AWS_REGION, S3_BACKUPS_BUCKET/,
	);
	const env = validateProductionEnvironment({
		NODE_ENV: "production",
		DB_PATH: "/data/beautycode.db",
		UPLOADS_DIR: "/data/uploads",
		SITE_URL: "https://beautycode.ge",
		AWS_REGION: "eu-central-1",
		S3_BACKUPS_BUCKET: "beautycode-ge-backups",
	});
	assert.equal(env.NODE_ENV, "production");
	assert.equal(env.PORT, 3000);
});
