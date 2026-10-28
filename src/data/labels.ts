export const stockLabels = {
	in_stock: "მარაგშია",
	out_of_stock: "არ არის მარაგში",
	preorder: "წინასწარი შეკვეთა",
} as const;

export const statusLabels = {
	draft: "მონახაზი",
	published: "გამოქვეყნებული",
	archived: "არქივი",
} as const;

export const categoryIconLabels = {
	wind: "თმა",
	sparkles: "ეპილაცია",
	droplet: "სახე",
	smile: "ღიმილი",
} as const;

export type StockStatus = keyof typeof stockLabels;
export type ProductStatus = keyof typeof statusLabels;
export type CategoryIcon = keyof typeof categoryIconLabels;

const keysOf = <K extends string>(labels: Record<K, string>) =>
	Object.keys(labels) as [K, ...K[]];

export const stockStatuses = keysOf(stockLabels);
export const productStatuses = keysOf(statusLabels);
export const categoryIconNames = keysOf(categoryIconLabels);
