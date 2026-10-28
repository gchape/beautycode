import { useMutation } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import type { AdminProduct, Category } from "../../data/catalog.ts";
import { adminApi } from "../../lib/admin/api.ts";
import { readProductForm } from "../../lib/admin/product-form.ts";
import type { EditableImage } from "../../lib/admin/use-image-upload.ts";
import { Button } from "../ui/button.tsx";
import { FormError } from "./form-error.tsx";
import { ImageEditor } from "./image-editor.tsx";
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
		<form
			className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8"
			onSubmit={submit}
		>
			<h2 className="text-xl font-semibold">
				{product ? "პროდუქტის რედაქტირება" : "ახალი პროდუქტი"}
			</h2>
			{product && (
				<p className="text-muted-foreground">/products/{product.slug}</p>
			)}
			<fieldset
				disabled={save.isPending}
				className="my-5 grid grid-cols-2 gap-5 max-[600px]:grid-cols-1"
			>
				<h3 className="col-span-full mb-0 border-b border-border pb-3 text-sm font-semibold">
					ძირითადი ინფორმაცია
				</h3>
				<ProductDetailsFields product={product} categories={categories} />
				<h3 className="col-span-full mt-4 mb-0 border-b border-border pb-3 text-sm font-semibold">
					ფასი და ხილვადობა
				</h3>
				<ProductPricingFields product={product} />
				<h3 className="col-span-full mt-4 mb-0 border-b border-border pb-3 text-sm font-semibold">
					აღწერა და მახასიათებლები
				</h3>
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
			<div className="sticky bottom-0 z-10 mt-8 flex flex-wrap items-center gap-3 border-t border-border bg-white/95 py-4 backdrop-blur">
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
