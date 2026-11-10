import { useId } from "react";
import type { Category } from "../../data/catalog.ts";
import { categoryIconLabels } from "../../data/labels.ts";
import { Checkbox } from "../ui/checkbox.tsx";
import { Input } from "../ui/input.tsx";
import { Label } from "../ui/label.tsx";
import { Select } from "../ui/select.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { Field } from "./field.tsx";

export function CategoryFields({ category }: { category?: Category }) {
	const id = useId();
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
			<div className="col-span-full flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
				<Checkbox
					id={id}
					name="is_active"
					defaultChecked={category ? category.is_active : true}
					className="mt-3 size-5 rounded-md"
					aria-describedby={`${id}-hint`}
				/>
				<div className="min-w-0">
					<Label htmlFor={id} className="min-h-11 leading-relaxed">
						საიტზე გამოჩენა
					</Label>
					<p
						id={`${id}-hint`}
						className="m-0 text-sm leading-relaxed text-muted-foreground"
					>
						კატეგორია და პროდუქტები საიტზე გამოჩნდება.
					</p>
				</div>
			</div>
		</>
	);
}
