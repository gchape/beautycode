import assert from "node:assert/strict";
import { test } from "node:test";
import { maxImageUploadBytes } from "../src/data/image-types.ts";
import {
	detectImageType,
	saveUploadedImage,
} from "../src/server/image-upload.ts";

const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0]);
const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"></svg>');

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

test("uploads validated bytes to Cloudinary and returns its secure URL", async (t) => {
	const { v2: cloudinary } = await import("cloudinary");
	const { Writable } = await import("node:stream");
	for (const key of [
		"CLOUDINARY_CLOUD_NAME",
		"CLOUDINARY_API_KEY",
		"CLOUDINARY_API_SECRET",
	]) {
		const previous = process.env[key];
		process.env[key] = "test-value";
		t.after(() => {
			if (previous === undefined) delete process.env[key];
			else process.env[key] = previous;
		});
	}
	const url =
		"https://res.cloudinary.com/test/image/upload/v1/beautycode/products/test.png";
	t.mock.method(cloudinary.uploader, "upload_stream", (options, callback) => {
		assert.equal(options.resource_type, "image");
		assert.equal(options.overwrite, false);
		assert.equal(options.api_secret, "test-value");
		return new Writable({
			write(chunk, encoding, done) {
				assert.deepEqual(chunk, png);
				callback(undefined, { secure_url: url });
				done();
			},
		});
	});
	assert.equal(await saveUploadedImage(png, "image/png"), url);
	cloudinary.uploader.upload_stream.mock.mockImplementation(
		(options, callback) => {
			callback({ message: "private provider details" });
			return new Writable({
				write(chunk, encoding, done) {
					done();
				},
			});
		},
	);
	await assert.rejects(
		() => saveUploadedImage(png, "image/png"),
		(asyncError) => asyncError instanceof Response && asyncError.status === 502,
	);
	delete process.env.CLOUDINARY_API_SECRET;
	await assert.rejects(
		() => saveUploadedImage(png, "image/png"),
		(error) => error instanceof Response && error.status === 503,
	);
});

test("rejects SVG and files whose declared type differs from their bytes", async () => {
	await assert.rejects(
		() => saveUploadedImage(svg, "image/svg+xml"),
		(error) => error instanceof Response && error.status === 400,
	);
	await assert.rejects(
		() => saveUploadedImage(png, "image/jpeg"),
		(error) => error instanceof Response && error.status === 400,
	);
});

test("rejects empty and oversized files before writing them", async () => {
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
});
