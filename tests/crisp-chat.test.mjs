import assert from "node:assert/strict";
import { test } from "node:test";
import { CrispClass } from "crisp-sdk-web";
import { createChatLauncher } from "../src/lib/crisp-chat.ts";

const product = {
	name: "სკალპის მასაჟორი",
	slug: "თმის მოვლა",
	price_minor: 19900,
	sale_price_minor: 14950,
};
globalThis.window = undefined;
globalThis.document = undefined;

function browser(t) {
	const scripts = [];
	const timers = new Map();
	t.mock.property(globalThis, "window", {
		location: { origin: "https://beautycode.com.ge" },
		setTimeout: (callback) => {
			const id = timers.size + 1;
			timers.set(id, callback);
			return id;
		},
		clearTimeout: (id) => timers.delete(id),
	});
	t.mock.property(globalThis, "document", {
		getElementsByTagName: () => [
			{ appendChild: (script) => scripts.push(script) },
		],
		createElement: () => ({}),
	});
	const sdk = new CrispClass();
	const chat = createChatLauncher("test-website-id", sdk);
	const loaded = () =>
		window.$crisp.findLast(
			(command) => command[0] === "on" && command[1] === "session:loaded",
		)[2]();
	const messages = () =>
		window.$crisp.filter((command) => command[1] === "message:send");
	return { chat, scripts, timers, loaded, messages };
}

test("official SDK injects one loader and sends product details only after session readiness", async (t) => {
	const { chat, scripts, loaded, messages } = browser(t);
	const pending = chat.open(product);
	assert.equal(messages().length, 0);
	assert.equal(scripts.length, 1);
	assert.equal(scripts[0].src, "https://client.crisp.chat/l.js");
	assert.equal(window.CRISP_WEBSITE_ID, "test-website-id");
	loaded();
	await pending;
	assert.equal(messages().length, 1);
	assert.equal(messages()[0][2][0], "text");
	assert.match(messages()[0][2][1], /149\.50 ₾/);
	assert.ok(messages()[0][2][1].includes(product.name));
	assert.ok(
		messages()[0][2][1].includes(
			`https://beautycode.com.ge/products/${encodeURIComponent(product.slug)}`,
		),
	);
	await chat.open({
		...product,
		name: "Second product",
		sale_price_minor: null,
	});
	assert.equal(scripts.length, 1);
	assert.equal(messages().length, 2);
	assert.match(messages()[1][2][1], /Second product\nფასი: 199\.00/);
});

test("ordinary contact opens chat without sending or replacing any message", async (t) => {
	const { chat, loaded, messages } = browser(t);
	const pending = chat.open();
	loaded();
	await pending;
	assert.deepEqual(
		window.$crisp.filter((command) => command[0] === "do"),
		[
			["do", "chat:show"],
			["do", "chat:open"],
		],
	);
	assert.equal(messages().length, 0);
});

test("a failed load does not queue a product to send unexpectedly later", async (t) => {
	const { chat, timers, loaded, messages } = browser(t);
	const pending = chat.open(product);
	const rejection = assert.rejects(pending, /could not connect/);
	[...timers.values()][0]();
	await rejection;
	loaded();
	assert.equal(messages().length, 0);
	await chat.open(product);
	assert.equal(messages().length, 1);
});

test("missing configuration fails without injecting a widget", async (t) => {
	const { scripts } = browser(t);
	await assert.rejects(
		createChatLauncher("", new CrispClass()).open(product),
		/website ID is missing/,
	);
	assert.equal(scripts.length, 0);
});
