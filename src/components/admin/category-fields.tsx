import type { Category } from "../../data/catalog.ts";
import { categoryIconLabels } from "../../data/labels.ts";
import { Input } from "../ui/input.tsx";
import { Select, SelectItem } from "../ui/select.tsx";
import { Field } from "./field.tsx";

export function CategoryFields({ category }: { category?: Category }) {
	return (
		<>
			<Field label="დასახელება">
				<Input
					name="name"
					required
					maxLength={100}
					defaultValue={category?.name}
				/>
			</Field>
			<Field label="აღწერა">
				<Input
					name="description"
					maxLength={500}
					defaultValue={category?.description}
				/>
			</Field>
			<Field label="რიგითობა">
				<Input
					type="number"
					name="sort_order"
					min="0"
					max="10000"
					required
					defaultValue={category?.sort_order || 0}
				/>
			</Field>
			<Field label="ხატულა">
				<Select name="icon" defaultValue={category?.icon || "sparkles"}>
					{Object.entries(categoryIconLabels).map(([value, label]) => (
						<SelectItem key={value} value={value}>
							{label}
						</SelectItem>
					))}
				</Select>
			</Field>
			<label className="flex items-center gap-2.5">
				<input
					type="checkbox"
					name="is_active"
					defaultChecked={category ? category.is_active : true}
				/>{" "}
				საიტზე გამოჩენა
			</label>
		</>
	);
}
