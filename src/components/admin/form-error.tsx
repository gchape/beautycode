import { AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";
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
	icon: "კატეგორიის სიმბოლო",
	sort_order: "რიგითობა",
};

export function FormError({ error }: { error: unknown }) {
	const summary = useRef<HTMLDivElement>(null);
	const focusedError = useRef<unknown>(null);
	useEffect(() => {
		if (error && error !== focusedError.current) {
			focusedError.current = error;
			summary.current?.focus({ preventScroll: true });
			summary.current?.scrollIntoView({ block: "center" });
		}
	}, [error]);
	if (!error) return null;
	const { message, fieldErrors } = validationDetails(error);
	return (
		<div
			ref={summary}
			tabIndex={-1}
			role="alert"
			className="my-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 outline-none"
		>
			<AlertCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
			<div className="min-w-0">
				<p className="mt-0 mb-0 font-medium">{message}</p>
				{Object.keys(fieldErrors).length > 0 && (
					<ul className="mt-2 mb-0 list-disc space-y-1 pl-5">
						{Object.entries(fieldErrors).map(([field, messages]) => (
							<li key={field}>
								{labels[field] || field}: {messages.join("; ")}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
