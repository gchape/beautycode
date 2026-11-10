import { useMutation } from "@tanstack/react-query";
import type { FormEvent } from "react";
import type { Category } from "../../data/catalog.ts";
import { adminApi } from "../../lib/admin/api.ts";
import { readCategoryForm } from "../../lib/admin/category-form.ts";
import { Card } from "../ui/card.tsx";
import { CategoryFields } from "./category-fields.tsx";
import { EditorHeader } from "./editor-layout.tsx";
import { FormActions } from "./form-actions.tsx";
import { FormError } from "./form-error.tsx";

export function CategoryEditor({
	category,
	onSaved,
	onCancel,
}: {
	category?: Category;
	onSaved: () => Promise<void>;
	onCancel: () => void;
}) {
	const save = useMutation({
		mutationFn: async (form: FormData) =>
			adminApi("categories", readCategoryForm(form, category?.slug)),
		onSuccess: onSaved,
	});
	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!save.isPending) save.mutate(new FormData(event.currentTarget));
	}
	return (
		<form
			className="mt-6 max-w-4xl"
			onSubmit={submit}
			aria-busy={save.isPending}
		>
			<EditorHeader
				title={category ? "კატეგორიის რედაქტირება" : "ახალი კატეგორია"}
				backLabel="კატეგორიების სიაში დაბრუნება"
				busy={save.isPending}
				onCancel={onCancel}
			/>
			<Card className="p-4 shadow-none sm:p-6">
				<fieldset
					disabled={save.isPending}
					className="grid min-w-0 gap-5 sm:grid-cols-2"
				>
					<legend className="sr-only">კატეგორიის ინფორმაცია</legend>
					<CategoryFields category={category} />
				</fieldset>
			</Card>
			<FormError error={save.error} />
			<FormActions onCancel={onCancel} pending={save.isPending} />
		</form>
	);
}
