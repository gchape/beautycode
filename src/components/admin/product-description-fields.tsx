import type { AdminProduct } from "../../data/catalog.ts";
import { Textarea } from "../ui/textarea.tsx";
import { Field } from "./field.tsx";

export function ProductDescriptionFields({
	product,
}: {
	product?: AdminProduct;
}) {
	return (
		<div className="grid gap-5">
			<Field label="აღწერა" hint="აღწერეთ პროდუქტის დანიშნულება და გამოყენება.">
				<Textarea
					name="description"
					rows={5}
					maxLength={10000}
					defaultValue={product?.description}
					placeholder="რა უნდა იცოდეს მომხმარებელმა ამ პროდუქტზე?"
				/>
			</Field>
			<Field
				label="მახასიათებლები"
				hint="თითო ხაზზე მიუთითეთ ერთი მახასიათებელი."
			>
				<Textarea
					name="features"
					rows={5}
					defaultValue={product?.features?.join("\n")}
					placeholder={"გაგრილების ფუნქცია\nსიმძლავრის 5 დონე"}
				/>
			</Field>
			<Field
				label="SEO აღწერა"
				hint="მოკლე აღწერა საძიებო სისტემებისთვის. მაქსიმუმ 300 სიმბოლო."
			>
				<Textarea
					name="meta_description"
					rows={3}
					maxLength={300}
					defaultValue={product?.meta_description}
					placeholder="პროდუქტის მოკლე მიმოხილვა"
				/>
			</Field>
		</div>
	);
}
