import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { maxImageUploadBytes } from "../src/data/image-types.ts";
import {
	detectImageType,
	saveUploadedImage,
} from "../src/server/image-upload.ts";

const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0]);
const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"></svg>');

async function withUploadDirectory(t) {
	const directory = await mkdtemp(join(tmpdir(), "beautycode-upload-"));
	const previous = process.env.UPLOADS_DIR;
	process.env.UPLOADS_DIR = directory;
	t.after(async () => {
		if (previous === undefined) delete process.env.UPLOADS_DIR;
		else process.env.UPLOADS_DIR = previous;
		await rm(directory, { recursive: true, force: true });
	});
	return directory;
}

test("detects supported image types from their bytes", () => {
	assert.equal(detectImageType(png), "image/png");
	assert.equal(detectImageType(Buffer.from("RIFF0000WEBP")), "image/webp");
	assert.equal(detectImageType(Buffer.from("0000ftypavif")), "image/avif");
	assert.equal(
		detectImageType(Buffer.from([0xff, 0xd8, 0xff, 0x00])),
		"image/jpeg",
	);
	assert.equal(detectImageType(svg), undefined);
});

test("stores a valid image under a generated name and returns its public path", async (t) => {
	const directory = await withUploadDirectory(t);
	const imageUrl = await saveUploadedImage(png, "image/png");
	assert.match(imageUrl, /^\/uploads\/[0-9a-f-]+\.png$/);
	assert.deepEqual(
		await readFile(join(directory, imageUrl.split("/").at(-1))),
		png,
	);
});

test("rejects SVG and files whose declared type differs from their bytes", async (t) => {
	const directory = await withUploadDirectory(t);
	await assert.rejects(
		() => saveUploadedImage(svg, "image/svg+xml"),
		(error) => error instanceof Response && error.status === 400,
	);
	await assert.rejects(
		() => saveUploadedImage(png, "image/jpeg"),
		(error) => error instanceof Response && error.status === 400,
	);
	assert.deepEqual(await readdir(directory), []);
});

test("rejects empty and oversized files before writing them", async (t) => {
	const directory = await withUploadDirectory(t);
	await assert.rejects(
		() => saveUploadedImage(Buffer.alloc(0), "image/png"),
		(error) => error instanceof Response && error.status === 413,
	);
	await assert.rejects(
		() =>
			saveUploadedImage(
				Buffer.concat([png, Buffer.alloc(maxImageUploadBytes)]),
				"image/png",
			),
		(error) => error instanceof Response && error.status === 413,
	);
	assert.deepEqual(await readdir(directory), []);
});
