import assert from "node:assert/strict";
import { test } from "node:test";
import {
	catalogSearchSchema,
	filterProducts,
} from "../src/lib/catalog-search.ts";

const products = [
	{ id: 1, category_slug: "hair", price_minor: 10000, sale_price_minor: 5000 },
	{ id: 3, category_slug: "hair", price_minor: 6000, sale_price_minor: null },
	{ id: 2, category_slug: "skin", price_minor: 8000, sale_price_minor: 6000 },
];

test("catalog combines filters using discounted prices and an inclusive price limit", () => {
	assert.deepEqual(
		filterProducts(products, { category: "hair", discount: true, max: 50 }).map(
			(p) => p.id,
		),
		[1],
	);
	assert.equal(filterProducts(products, { max: 0 }).length, 0);
	assert.equal(filterProducts(products, { category: "missing" }).length, 0);
});

test("catalog sorts without mutating the source list", () => {
	const source = Object.freeze([...products]);
	assert.deepEqual(
		filterProducts(source, {}).map((p) => p.id),
		[3, 2, 1],
	);
	assert.deepEqual(
		filterProducts(source, { sort: "price-asc" }).map((p) => p.id),
		[1, 3, 2],
	);
	assert.deepEqual(
		filterProducts(source, { sort: "price-desc" }).map((p) => p.id),
		[3, 2, 1],
	);
	assert.deepEqual(
		source.map((p) => p.id),
		[1, 3, 2],
	);
});

test("catalog search rejects invalid bounds and sorting options", () => {
	assert.equal(catalogSearchSchema.safeParse({ max: -1 }).success, false);
	assert.equal(
		catalogSearchSchema.safeParse({ q: "x".repeat(201) }).success,
		false,
	);
	assert.equal(
		catalogSearchSchema.safeParse({ sort: "invalid" }).success,
		false,
	);
	assert.equal(
		catalogSearchSchema.safeParse({ max: 0, sort: "newest" }).success,
		true,
	);
});
