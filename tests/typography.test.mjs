import assert from "node:assert/strict";
import { test } from "node:test";
import { cn } from "../src/lib/utils.ts";

test("custom font sizes replace default sizes without removing text colors", () => {
	for (const size of ["body", "subheading", "price", "caption"]) {
		assert.equal(
			cn("text-sm text-primary-foreground", `text-${size}`),
			`text-primary-foreground text-${size}`,
		);
		assert.equal(
			cn(`text-${size}`, "text-muted-foreground"),
			`text-${size} text-muted-foreground`,
		);
		assert.equal(cn(`text-${size}`, "text-sm"), "text-sm");
	}
});

test("responsive and descendant font sizes merge independently of colors", () => {
	assert.equal(
		cn(
			"text-sm sm:text-lg",
			"text-body sm:text-subheading text-muted-foreground",
		),
		"text-body sm:text-subheading text-muted-foreground",
	);
	assert.equal(
		cn("[&_p]:text-sm", "[&_p]:text-body [&_p]:text-muted-foreground"),
		"[&_p]:text-body [&_p]:text-muted-foreground",
	);
});
