import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { type FormEvent, useEffect, useRef } from "react";
import type { Category } from "../../data/catalog.ts";
import { adminApi } from "../../lib/admin/api.ts";
import { readCategoryForm } from "../../lib/admin/category-form.ts";
import { Button } from "../ui/button.tsx";
import { Card } from "../ui/card.tsx";
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
	const heading = useRef<HTMLHeadingElement>(null);
	const save = useMutation({
		mutationFn: async (form: FormData) =>
			adminApi("categories", readCategoryForm(form, category?.slug)),
		onSuccess: onSaved,
	});
	useEffect(() => {
		heading.current?.focus({ preventScroll: true });
		heading.current?.scrollIntoView({ block: "start" });
	}, []);
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
			<div className="mb-6 flex items-start gap-3">
				<Button
					variant="ghost"
					size="icon"
					className="size-11 shrink-0"
					onClick={onCancel}
					disabled={save.isPending}
					aria-label="კატეგორიების სიაში დაბრუნება"
				>
					<ArrowLeft size={18} />
				</Button>
				<h2
					ref={heading}
					tabIndex={-1}
					className="m-0 scroll-mt-6 text-2xl leading-relaxed outline-none"
				>
					{category ? "კატეგორიის რედაქტირება" : "ახალი კატეგორია"}
				</h2>
			</div>
			<Card className="p-4 shadow-none sm:p-6">
				<fieldset
					disabled={save.isPending}
					className="grid min-w-0 gap-5 sm:grid-cols-2 [&_input:not([type=checkbox])]:min-h-11"
				>
					<legend className="sr-only">კატეგორიის ინფორმაცია</legend>
					<CategoryFields category={category} />
				</fieldset>
			</Card>
			<FormError error={save.error} />
			<div className="sticky bottom-0 z-10 mt-6 flex flex-wrap justify-end gap-3 border-t border-border bg-background py-4">
				<Button
					variant="outline"
					className="min-h-11 flex-1 px-4 sm:flex-none"
					onClick={onCancel}
					disabled={save.isPending}
				>
					გაუქმება
				</Button>
				<Button
					type="submit"
					className="min-h-11 flex-1 px-4 sm:flex-none"
					disabled={save.isPending}
				>
					{save.isPending ? "ინახება…" : "შენახვა"}
				</Button>
			</div>
		</form>
	);
}
