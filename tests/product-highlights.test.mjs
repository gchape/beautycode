import assert from "node:assert/strict";
import { test } from "node:test";
import {
	comparisonValue,
	epilatorComparisonFields,
	productHighlights,
	productWarranty,
} from "../src/lib/product-highlights.ts";

test("purchase highlights keep product facts separate from delivery and warranty", () => {
	const product = {
		features: [
			"უფასო მიწოდება",
			"5-წლიანი გარანტია",
			"1 მილიონი იმპულსი",
			"სიმძლავრის 5 დონე",
			"გაგრილების ფუნქცია",
			"ავტომატური რეჟიმი",
		],
	};
	assert.deepEqual(productHighlights(product), [
		"1 მილიონი იმპულსი",
		"სიმძლავრის 5 დონე",
		"გაგრილების ფუნქცია",
	]);
	assert.equal(productWarranty(product), "5-წლიანი გარანტია");
});

test("comparison reads edited specifications without inventing missing accessories", () => {
	const product = {
		features: [
			"სიმძლავრის 9 დონე",
			"2 თავაკი და დამცავი სათვალე",
			"HR — ეპილაციის რეჟიმი",
			"SC — კანის მოვლის რეჟიმი",
		],
	};
	const value = (label) =>
		comparisonValue(
			product,
			epilatorComparisonFields.find((field) => field.label === label).pattern,
		);
	assert.equal(value("სიმძლავრე"), "სიმძლავრის 9 დონე");
	assert.equal(value("კომპლექტაცია"), "2 თავაკი და დამცავი სათვალე");
	assert.equal(
		value("რეჟიმები"),
		"HR — ეპილაციის რეჟიმი\nSC — კანის მოვლის რეჟიმი",
	);
	assert.equal(value("გაგრილება"), "");
	assert.equal(productWarranty(product), undefined);
});
