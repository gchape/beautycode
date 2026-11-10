import type { AdminProduct, Category } from "../../data/catalog.ts";
import { Input } from "../ui/input.tsx";
import { Select } from "../ui/select.tsx";
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
			<Field label="დასახელება" className="col-span-full">
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
					name="category_slug"
					defaultValue={product?.category_slug ?? ""}
					required
				>
					<option value="" disabled>
						აირჩიეთ კატეგორია
					</option>
					{categories.map((c) => (
						<option value={c.slug} key={c.slug}>
							{c.name}
							{!c.is_active ? " (დამალული)" : ""}
						</option>
					))}
				</Select>
			</Field>
			<Field label="SKU / კოდი" hint="შიდა კოდი, სურვილისამებრ.">
				<Input name="sku" maxLength={100} defaultValue={product?.sku || ""} />
			</Field>
		</>
	);
}
