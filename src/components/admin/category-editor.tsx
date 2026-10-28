import { useMutation } from "@tanstack/react-query";
import type { FormEvent } from "react";
import type { Category } from "../../data/catalog";
import { adminApi } from "../../lib/admin/api";
import { categoryInput } from "../../lib/admin/schemas";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field } from "./field";
import { FormError } from "./form-error";
export function CategoryEditor({
	category,
	onSaved,
	onCancel,
}: {
	category?: Category;
	onSaved: () => void;
	onCancel: () => void;
}) {
	const save = useMutation({
		mutationFn: async (form: FormData) =>
			adminApi(
				"categories",
				categoryInput.parse({
					slug: category?.slug,
					name: form.get("name"),
					description: form.get("description"),
					icon: form.get("icon"),
					sort_order: Number(form.get("order")),
					is_active: form.has("active"),
				}),
			),
		onSuccess: onSaved,
	});
	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (save.isPending) return;
		save.mutate(new FormData(event.currentTarget));
	}

	return (
		<form className="admin-editor" onSubmit={submit}>
			<h2>{category ? "კატეგორიის რედაქტირება" : "ახალი კატეგორია"}</h2>
			<fieldset disabled={save.isPending} className="admin-form-grid">
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
						name="order"
						min="0"
						max="10000"
						required
						defaultValue={category?.sort_order || 0}
					/>
				</Field>
				<Field label="ხატულა">
					<select name="icon" defaultValue={category?.icon || "sparkles"}>
						<option value="wind">თმა</option>
						<option value="sparkles">ეპილაცია</option>
						<option value="droplet">სახე</option>
						<option value="smile">ღიმილი</option>
					</select>
				</Field>
				<label className="admin-check">
					<input
						type="checkbox"
						name="active"
						defaultChecked={category ? !!category.is_active : true}
					/>{" "}
					საიტზე გამოჩენა
				</label>
			</fieldset>
			<FormError error={save.error} />
			<div className="admin-actions">
				<Button type="submit" disabled={save.isPending}>
					შენახვა
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={onCancel}
					disabled={save.isPending}
				>
					გაუქმება
				</Button>
			</div>
		</form>
	);
}
