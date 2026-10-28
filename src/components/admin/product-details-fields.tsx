import type { AdminProduct, Category } from "../../data/catalog.ts";
import { Input } from "../ui/input.tsx";
import { Select, SelectItem } from "../ui/select.tsx";
import { Field } from "./field.tsx";

export function ProductDetailsFields({
	product,
	categories,
}: {
	product?: AdminProduct;
	categories: Category[];
}) {
	return (
		<>
			<Field label="დასახელება">
				<Input
					name="name"
					required
					maxLength={200}
					defaultValue={product?.name}
				/>
			</Field>
			<Field label="ბრენდი">
				<Input
					name="brand"
					maxLength={100}
					defaultValue={product?.brand || "Beauty Code"}
				/>
			</Field>
			<Field label="კატეგორია">
				<Select
					placeholder="აირჩიეთ კატეგორია"
					name="category_slug"
					defaultValue={product?.category_slug}
					required
				>
					{categories.map((c) => (
						<SelectItem value={c.slug} key={c.slug}>
							{c.name}
							{!c.is_active ? " (დამალული)" : ""}
						</SelectItem>
					))}
				</Select>
			</Field>
			<Field label="SKU / კოდი">
				<Input name="sku" maxLength={100} defaultValue={product?.sku || ""} />
			</Field>
		</>
	);
}
