import assert from "node:assert/strict";
import { test } from "node:test";
import { productData, productPath, serializeJsonLd } from "../src/lib/seo.ts";
import { sitemapXml } from "../src/server/sitemap.ts";

test("structured product data uses sale prices and escapes embedded markup", () => {
	const product = {
		name: "</script><script>alert(1)</script>",
		slug: "ტესტი",
		brand: "Beauty",
		description: "Test",
		price_minor: 30000,
		sale_price_minor: 14900,
		stock_status: "out_of_stock",
		images: [{ url: "/images/ipl-kit-cutout.png", alt: "" }],
	};
	const data = productData(product);
	assert.equal(data.offers.price, "149.00");
	assert.equal(data.offers.priceCurrency, "GEL");
	assert.equal(data.offers.availability, "https://schema.org/OutOfStock");
	assert.ok(!serializeJsonLd(data).includes("<"));
	assert.equal(
		productPath(product.slug),
		`/products/${encodeURIComponent(product.slug)}`,
	);
	const xml = sitemapXml([{ slug: "სახე" }], [product]);
	assert.ok(xml.includes(productPath(product.slug)));
	assert.ok(!xml.includes("/admin"));
});
