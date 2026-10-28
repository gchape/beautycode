import type { AdminProduct, Category } from "../../data/catalog.ts";
import { statusLabels, stockLabels } from "../../data/labels.ts";
import { Input } from "../ui/input.tsx";
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
				<select
					name="category_slug"
					defaultValue={product?.category_slug}
					required
				>
					<option value="">აირჩიეთ კატეგორია</option>
					{categories.map((c) => (
						<option value={c.slug} key={c.slug}>
							{c.name}
							{!c.is_active ? " (დამალული)" : ""}
						</option>
					))}
				</select>
			</Field>
			<Field label="SKU / კოდი">
				<Input name="sku" maxLength={100} defaultValue={product?.sku || ""} />
			</Field>
		</>
	);
}

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
				<select name="status" defaultValue={product?.status || "draft"}>
					{Object.entries(statusLabels).map(([value, label]) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</select>
			</Field>
			<Field label="მარაგი">
				<select
					name="stock_status"
					defaultValue={product?.stock_status || "in_stock"}
				>
					{Object.entries(stockLabels).map(([value, label]) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</select>
			</Field>
		</>
	);
}

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
			<Field label="მახასიათებლები — თითო ხაზზე ერთი">
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
			<label className="admin-check">
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
