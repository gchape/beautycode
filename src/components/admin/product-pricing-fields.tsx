import type { AdminProduct } from "../../data/catalog.ts";
import { statusLabels, stockLabels } from "../../data/labels.ts";
import { Input } from "../ui/input.tsx";
import { Select } from "../ui/select.tsx";
import { CheckboxField, Field } from "./field.tsx";

export function ProductPricingFields({ product }: { product?: AdminProduct }) {
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
			<CheckboxField
				name="is_featured"
				label="მთავარ გვერდზე გამოჩენა"
				hint="შერჩეული კოლექციისთვის. საჭიროა გამოქვეყნებული სტატუსი."
				defaultChecked={product?.is_featured}
			/>
		</>
	);
}
