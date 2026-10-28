import { useMutation } from "@tanstack/react-query";
import type { FormEvent } from "react";
import type { Category } from "../../data/catalog.ts";
import { adminApi } from "../../lib/admin/api.ts";
import { readCategoryForm } from "../../lib/admin/category-form.ts";
import { Button } from "../ui/button.tsx";
import { CategoryFields } from "./category-fields.tsx";
import { FormError } from "./form-error.tsx";

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
			adminApi("categories", readCategoryForm(form, category?.slug)),
		onSuccess: onSaved,
	});
	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (save.isPending) return;
		save.mutate(new FormData(event.currentTarget));
	}

	return (
		<form
			className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8"
			onSubmit={submit}
		>
			<h2 className="text-xl font-semibold">
				{category ? "კატეგორიის რედაქტირება" : "ახალი კატეგორია"}
			</h2>
			<fieldset
				disabled={save.isPending}
				className="my-5 grid grid-cols-2 gap-5 max-[600px]:grid-cols-1"
			>
				<CategoryFields category={category} />
			</fieldset>
			<FormError error={save.error} />
			<div className="sticky bottom-0 z-10 mt-8 flex flex-wrap items-center gap-3 border-t border-border bg-white/95 py-4 backdrop-blur">
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
