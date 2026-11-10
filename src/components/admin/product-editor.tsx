import { useIsMutating, useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { type FormEvent, useState } from "react";
import type { AdminProduct, Category } from "../../data/catalog.ts";
import { adminApi } from "../../lib/admin/api.ts";
import { readProductForm } from "../../lib/admin/product-form.ts";
import {
	type EditableImage,
	imageUploadKey,
} from "../../lib/admin/use-image-upload.ts";
import { Button } from "../ui/button.tsx";
import { EditorHeader, EditorSection } from "./editor-layout.tsx";
import { FormActions } from "./form-actions.tsx";
import { FormError } from "./form-error.tsx";
import { ImageEditor } from "./image-editor.tsx";
import { ProductDescriptionFields } from "./product-description-fields.tsx";
import { ProductDetailsFields } from "./product-details-fields.tsx";
import { ProductPricingFields } from "./product-pricing-fields.tsx";

export function ProductEditor({
	product,
	categories,
	onSaved,
	onCancel,
}: {
	product?: AdminProduct;
	categories: Category[];
	onSaved: () => Promise<void>;
	onCancel: () => void;
}) {
	const [images, setImages] = useState<EditableImage[]>(() =>
		(product?.images ?? []).map((image) => ({
			...image,
			key: crypto.randomUUID(),
		})),
	);
	const uploading = useIsMutating({ mutationKey: imageUploadKey }) > 0;
	const save = useMutation({
		mutationFn: async (form: FormData) =>
			adminApi("products", readProductForm(form, images, product?.id)),
		onSuccess: onSaved,
	});
	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!save.isPending && !uploading)
			save.mutate(new FormData(event.currentTarget));
	}
	return (
		<form
			onSubmit={submit}
			className="mt-6 max-w-4xl"
			aria-busy={save.isPending || uploading}
		>
			<EditorHeader
				title={product ? "პროდუქტის რედაქტირება" : "ახალი პროდუქტი"}
				backLabel="პროდუქტების სიაში დაბრუნება"
				busy={save.isPending || uploading}
				onCancel={onCancel}
			>
				{product?.status === "published" && (
					<Button
						asChild
						variant="outline"
						className="min-h-11 gap-2 px-3 text-sm"
					>
						<Link
							to="/products/$slug"
							params={{ slug: product.slug }}
							target="_blank"
							rel="noopener noreferrer"
						>
							საიტზე ნახვა <ArrowUpRight size={16} />
						</Link>
					</Button>
				)}
			</EditorHeader>
			<fieldset disabled={save.isPending} className="min-w-0 space-y-5">
				<legend className="sr-only">პროდუქტის ინფორმაცია</legend>
				<EditorSection title="ძირითადი ინფორმაცია">
					<div className="grid min-w-0 gap-5 sm:grid-cols-2">
						<ProductDetailsFields product={product} categories={categories} />
					</div>
				</EditorSection>
				<EditorSection title="ფასი და ხილვადობა">
					<div className="grid min-w-0 gap-5 sm:grid-cols-2">
						<ProductPricingFields product={product} />
					</div>
				</EditorSection>
				<EditorSection title="აღწერა და მახასიათებლები">
					<ProductDescriptionFields product={product} />
				</EditorSection>
				<EditorSection title="სურათები">
					<ImageEditor images={images} onChange={setImages} />
				</EditorSection>
			</fieldset>
			<FormError error={save.error} />
			<FormActions
				onCancel={onCancel}
				pending={save.isPending}
				uploading={uploading}
				canSubmit={categories.length > 0}
			/>
		</form>
	);
}
