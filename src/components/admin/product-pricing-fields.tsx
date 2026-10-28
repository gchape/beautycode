import type { AdminProduct } from "../../data/catalog.ts";
import { statusLabels, stockLabels } from "../../data/labels.ts";
import { Input } from "../ui/input.tsx";
import { Select, SelectItem } from "../ui/select.tsx";
import { Field } from "./field.tsx";

export function ProductPricingFields({ product }: { product?: AdminProduct }) {
	return (
		<>
			<Field label="ფასი (₾)">
				<Input
					name="price"
					type="number"
					min="0"
					max="1000000"
					step="0.01"
					required
					defaultValue={(product?.price_minor || 0) / 100}
				/>
			</Field>
			<Field label="ფასდაკლებული ფასი (₾), სურვილისამებრ">
				<Input
					name="sale_price"
					type="number"
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
						<SelectItem key={value} value={value}>
							{label}
						</SelectItem>
					))}
				</Select>
			</Field>
			<Field label="მარაგი">
				<Select
					name="stock_status"
					defaultValue={product?.stock_status || "in_stock"}
				>
					{Object.entries(stockLabels).map(([value, label]) => (
						<SelectItem key={value} value={value}>
							{label}
						</SelectItem>
					))}
				</Select>
			</Field>
		</>
	);
}
