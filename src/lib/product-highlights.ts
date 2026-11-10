import type { PublicProduct } from "../data/catalog.ts";

export const productWarranty = (product: Pick<PublicProduct, "features">) =>
	product.features.find((feature) => /გარანტია/.test(feature));

export const productHighlights = (product: Pick<PublicProduct, "features">) =>
	product.features
		.filter((feature) => !/გარანტია|მიწოდება/.test(feature))
		.slice(0, 3);

// Read the comparison from the editable catalog, so prices and specifications
// stay consistent with the product pages instead of duplicating marketing copy.
export const epilatorComparisonFields = [
	{ label: "იმპულსები", pattern: /იმპულს/ },
	{ label: "სიმძლავრე", pattern: /სიმძლავრ/ },
	{ label: "გაგრილება", pattern: /გაგრილ|მოყინვ/ },
	{ label: "კომპლექტაცია", pattern: /თავაკ|სათვალ/ },
	{ label: "რეჟიმები", pattern: /რეჟიმ/ },
	{ label: "გარანტია", pattern: /გარანტია/ },
] as const;

export const comparisonValue = (
	product: Pick<PublicProduct, "features">,
	pattern: RegExp,
) => product.features.filter((feature) => pattern.test(feature)).join("\n");
