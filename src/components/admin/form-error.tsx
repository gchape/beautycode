import { validationDetails } from "../../lib/admin/errors.ts";

const labels: Record<string, string> = {
	name: "დასახელება",
	brand: "ბრენდი",
	category_slug: "კატეგორია",
	description: "აღწერა",
	price_minor: "ფასი",
	sale_price_minor: "ფასდაკლებული ფასი",
	sku: "SKU / კოდი",
	stock_status: "მარაგი",
	status: "სტატუსი",
	meta_description: "SEO აღწერა",
	features: "მახასიათებლები",
	images: "სურათები",
	icon: "ხატულა",
	sort_order: "რიგითობა",
};

export function FormError({ error }: { error: unknown }) {
	if (!error) return null;
	const { message, fieldErrors } = validationDetails(error);
	return (
		<div role="alert">
			<p>{message}</p>
			{Object.keys(fieldErrors).length > 0 && (
				<ul>
					{Object.entries(fieldErrors).map(([field, messages]) => (
						<li key={field}>
							{labels[field] || field}: {messages.join("; ")}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
