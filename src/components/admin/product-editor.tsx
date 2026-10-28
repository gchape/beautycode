import { useMutation } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import type { Category, Product } from "../../data/catalog";
import { adminApi } from "../../lib/admin/api";
import { readProductForm } from "../../lib/admin/product-form";
import { Button } from "../ui/button";
import { FormError } from "./form-error";
import { ImageEditor } from "./image-editor";
import {
	ProductDescriptionFields,
	ProductDetailsFields,
	ProductPricingFields,
} from "./product-fields";

export function ProductEditor({
	product,
	categories,
	onSaved,
	onCancel,
}: {
	product?: Product;
	categories: Category[];
	onSaved: () => void;
	onCancel: () => void;
}) {
	const [images, setImages] = useState(product?.images || []);
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
