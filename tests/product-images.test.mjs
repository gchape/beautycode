import assert from "node:assert/strict";
import { test } from "node:test";
import { cloudinaryUrl, productImageProps } from "../src/lib/product-images.ts";

const original =
	"https://res.cloudinary.com/demo/image/upload/v123/products/photo.webp";
test("delivery preserves asset version and requests Cloudinary optimization", () => {
	const url = cloudinaryUrl(original, 640);
	assert.match(url, /c_scale,w_640/);
	assert.match(url, /f_auto/);
	assert.match(url, /q_auto/);
	assert.match(url, /v123\/products\/photo.webp$/);
	assert.match(cloudinaryUrl(original, 1200, "jpg"), /f_jpg/);
});
test("responsive product and thumbnail variants are explicit", () => {
	const product = productImageProps(original, "50vw");
	assert.equal(product.sizes, "50vw");
	assert.equal(product.srcSet.split(", ").length, 5);
	const thumb = productImageProps(original, "72px", "thumbnail");
	assert.equal(thumb.srcSet.split(", ").length, 2);
	assert.match(thumb.src, /w_160/);
});
test("external, signed and already transformed URLs remain intact", () => {
	for (const url of [
		"/logo.jpg",
		"https://example.com/image.jpg",
		original.replace("v123/", "s--signature--/v123/"),
		original.replace("v123/", "w_400/v123/"),
		original.replace("v123/", "c_scale,w_400/v123/"),
		`${original}?token=test`,
	]) {
		assert.equal(cloudinaryUrl(url, 800), url);
		assert.deepEqual(productImageProps(url, "100vw"), { src: url });
	}
});
