import type { Category } from "../../data/catalog.ts";
import { categoryIconLabels } from "../../data/labels.ts";
import { Input } from "../ui/input.tsx";
import { Select } from "../ui/select.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { CheckboxField, Field } from "./field.tsx";

export function CategoryFields({ category }: { category?: Category }) {
	return (
		<>
			<Field label="დასახელება" className="col-span-full">
				<Input
					name="name"
					required
					maxLength={100}
					defaultValue={category?.name}
				/>
			</Field>
			<Field
				label="აღწერა"
				className="col-span-full"
				hint="ეს ტექსტი კატეგორიის გვერდზე გამოჩნდება."
			>
				<Textarea
					rows={3}
					name="description"
					maxLength={500}
					defaultValue={category?.description}
				/>
			</Field>
			<Field
				label="რიგითობა"
				hint="დაბალი რიცხვი კატეგორიას სიის დასაწყისში ათავსებს."
			>
				<Input
					type="number"
					name="sort_order"
					min="0"
					max="10000"
					required
					defaultValue={category?.sort_order || 0}
				/>
			</Field>
			<Field
				label="კატეგორიის სიმბოლო"
				hint="პატარა ნიშანი კატეგორიის ბარათზე და მობილურ მენიუში."
			>
				<Select name="icon" defaultValue={category?.icon || "sparkles"}>
					{Object.entries(categoryIconLabels).map(([value, label]) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</Select>
			</Field>
			<CheckboxField
				name="is_active"
				label="საიტზე გამოჩენა"
				hint="კატეგორია და პროდუქტები საიტზე გამოჩნდება."
				defaultChecked={category ? category.is_active : true}
			/>
		</>
	);
}
