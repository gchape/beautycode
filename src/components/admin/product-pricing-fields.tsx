import { useId } from "react";
import type { AdminProduct } from "../../data/catalog.ts";
import { statusLabels, stockLabels } from "../../data/labels.ts";
import { Checkbox } from "../ui/checkbox.tsx";
import { Input } from "../ui/input.tsx";
import { Label } from "../ui/label.tsx";
import { Select } from "../ui/select.tsx";
import { Field } from "./field.tsx";

export function ProductPricingFields({ product }: { product?: AdminProduct }) {
	const featuredId = useId();
	return (
		<>
			<Field label="ფასი (₾)">
				<Input
					name="price"
					type="number"
					inputMode="decimal"
					min="0"
					max="1000000"
					step="0.01"
					required
					defaultValue={product ? product.price_minor / 100 : ""}
				/>
			</Field>
			<Field
				label="ფასდაკლებული ფასი (₾)"
				hint="შეავსეთ მხოლოდ ფასდაკლების შემთხვევაში."
			>
				<Input
					name="sale_price"
					type="number"
					inputMode="decimal"
					min="0"
					max="1000000"
					step="0.01"
					defaultValue={
						product?.sale_price_minor == null
							? ""
							: product.sale_price_minor / 100
					}
				/>
			</Field>
			<Field label="სტატუსი">
				<Select name="status" defaultValue={product?.status || "draft"}>
					{Object.entries(statusLabels).map(([value, label]) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</Select>
			</Field>
			<Field label="მარაგი">
				<Select
					name="stock_status"
					defaultValue={product?.stock_status || "in_stock"}
				>
					{Object.entries(stockLabels).map(([value, label]) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</Select>
			</Field>
			<div className="col-span-full flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
				<Checkbox
					id={featuredId}
					name="is_featured"
					defaultChecked={product?.is_featured}
					className="mt-3 size-5 rounded-md"
					aria-describedby={`${featuredId}-hint`}
				/>
				<div className="min-w-0">
					<Label htmlFor={featuredId} className="min-h-11 leading-relaxed">
						მთავარ გვერდზე გამოჩენა
					</Label>
					<p
						id={`${featuredId}-hint`}
						className="m-0 text-sm leading-relaxed text-muted-foreground"
					>
						შერჩეული კოლექციისთვის. საჭიროა გამოქვეყნებული სტატუსი.
					</p>
				</div>
			</div>
		</>
	);
}
