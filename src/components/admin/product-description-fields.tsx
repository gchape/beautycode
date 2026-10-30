import type { AdminProduct } from "../../data/catalog.ts";
import { Field } from "./field.tsx";

export function ProductDescriptionFields({
	product,
}: {
	product?: AdminProduct;
}) {
	return (
		<>
			<Field label="აღწერა">
				<textarea
					name="description"
					rows={5}
					maxLength={10000}
					defaultValue={product?.description}
				/>
			</Field>
			<Field label="მახასიათებლები. თითო ხაზზე ერთი">
				<textarea
					name="features"
					rows={5}
					defaultValue={product?.features?.join("\n")}
				/>
			</Field>
			<Field label="SEO აღწერა">
				<textarea
					name="meta_description"
					rows={2}
					maxLength={300}
					defaultValue={product?.meta_description}
				/>
			</Field>
			<label className="flex items-center gap-2.5">
				<input
					type="checkbox"
					name="is_featured"
					defaultChecked={product?.is_featured}
				/>{" "}
				მთავარ გვერდზე გამოჩენა
			</label>
		</>
	);
}
