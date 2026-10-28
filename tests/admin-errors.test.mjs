import assert from "node:assert/strict";
import { test } from "node:test";
import { z } from "zod";
import { adminApi } from "../src/lib/admin/api.ts";
import { AdminError, validationDetails } from "../src/lib/admin/errors.ts";
import { adminRequest } from "../src/server/admin/http.ts";

const schema = z.object({
	name: z.string().min(1, "Name is required"),
	images: z.array(z.object({ url: z.url() })),
});

test("validation groups nested errors under their form fields", () => {
	const result = schema.safeParse({ name: "", images: [{ url: "invalid" }] });
	assert.equal(result.success, false);
	const details = validationDetails(result.error);
	assert.deepEqual(details.fieldErrors.name, ["Name is required"]);
	assert.equal(details.fieldErrors.images.length, 1);
	assert.equal(details.message.startsWith("["), false);
	const root = z
		.string()
		.refine(() => false, "General error")
		.safeParse("value");
	assert.equal(validationDetails(root.error).message, "General error");
});

test("server validation errors survive the fetch client unchanged", async (t) => {
	const request = new Request("https://beautycode.ge/admin/api/products", {
		headers: {
			"x-remote-user": "admin",
		},
	});
	const response = await adminRequest(request, () =>
		schema.parse({ name: "", images: [] }),
	);
	assert.equal(response.status, 400);
	t.mock.method(globalThis, "fetch", async () => response);
	await assert.rejects(
		() => adminApi("products", {}),
		(error) => {
			assert.ok(error instanceof AdminError);
			assert.deepEqual(validationDetails(error).fieldErrors.name, [
				"Name is required",
			]);
			return true;
		},
	);
});

test("non-JSON authentication and proxy errors produce readable messages", async (t) => {
	const mock = t.mock.method(
		globalThis,
		"fetch",
		async () => new Response("Unauthorized", { status: 401 }),
	);
	await assert.rejects(() => adminApi("products"), {
		message: "ავტორიზაცია საჭიროა",
	});
	mock.mock.mockImplementation(
		async () => new Response("<html>Bad Gateway</html>", { status: 502 }),
	);
	await assert.rejects(() => adminApi("products"), {
		message: "ოპერაცია ვერ შესრულდა",
	});
});

test("successful native fetch requests preserve method, data and credentials", async (t) => {
	t.mock.method(globalThis, "fetch", async (url, options) => {
		assert.equal(url, "/admin/api/products");
		assert.equal(options.method, "POST");
		assert.equal(options.credentials, "same-origin");
		assert.deepEqual(JSON.parse(options.body), { name: "Product" });
		return Response.json({ id: 7 });
	});
	assert.deepEqual(await adminApi("products", { name: "Product" }), { id: 7 });
});
