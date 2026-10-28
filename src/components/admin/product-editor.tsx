import { useMutation } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import type { AdminProduct, Category } from "../../data/catalog.ts";
import { adminApi } from "../../lib/admin/api.ts";
import { readProductForm } from "../../lib/admin/product-form.ts";
import { Button } from "../ui/button.tsx";
import { FormError } from "./form-error.tsx";
import { type EditableImage, ImageEditor } from "./image-editor.tsx";
import {
	ProductDescriptionFields,
	ProductDetailsFields,
	ProductPricingFields,
} from "./product-fields.tsx";

export function ProductEditor({
	product,
	categories,
	onSaved,
	onCancel,
}: {
	product?: AdminProduct;
	categories: Category[];
	onSaved: () => void;
	onCancel: () => void;
}) {
	const [images, setImages] = useState<EditableImage[]>(() =>
		(product?.images ?? []).map((image) => ({
			...image,
			key: crypto.randomUUID(),
		})),
	);
	const [uploading, setUploading] = useState(false);
	const save = useMutation({
		mutationFn: async (form: FormData) =>
			adminApi("products", readProductForm(form, images, product?.id)),
		onSuccess: onSaved,
	});
	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (save.isPending || uploading) return;
		save.mutate(new FormData(event.currentTarget));
	}

	return (
		<form className="admin-editor" onSubmit={submit}>
			<h2>{product ? "პროდუქტის რედაქტირება" : "ახალი პროდუქტი"}</h2>
			{product && <p className="muted">/products/{product.slug}</p>}
			<fieldset disabled={save.isPending} className="admin-form-grid">
				<ProductDetailsFields product={product} categories={categories} />
				<ProductPricingFields product={product} />
				<ProductDescriptionFields product={product} />
			</fieldset>
			<fieldset disabled={save.isPending}>
				<ImageEditor
					images={images}
					onChange={setImages}
					onBusy={setUploading}
				/>
			</fieldset>
			<FormError error={save.error} />
			<div className="admin-actions">
				<Button
					disabled={save.isPending || uploading || !categories.length}
					type="submit"
				>
					{save.isPending ? "ინახება…" : "შენახვა"}
				</Button>
				<Button
					type="button"
					variant="outline"
					disabled={save.isPending || uploading}
					onClick={onCancel}
				>
					გაუქმება
				</Button>
			</div>
		</form>
	);
}
