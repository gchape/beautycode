import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, LoaderCircle } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import type { AdminProduct, Category } from "../../data/catalog.ts";
import { adminApi } from "../../lib/admin/api.ts";
import { readProductForm } from "../../lib/admin/product-form.ts";
import type { EditableImage } from "../../lib/admin/use-image-upload.ts";
import { Button } from "../ui/button.tsx";
import { Card } from "../ui/card.tsx";
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
	const heading = useRef<HTMLHeadingElement>(null);
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
	useEffect(() => {
		heading.current?.focus({ preventScroll: true });
		heading.current?.scrollIntoView({ block: "start" });
	}, []);
	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!save.isPending && !uploading)
			save.mutate(new FormData(event.currentTarget));
	}
	return (
		<form
			onSubmit={submit}
			className="mt-6 max-w-4xl"
			aria-busy={save.isPending}
		>
			<div className="mb-6 flex flex-wrap items-start justify-between gap-4">
				<div className="flex min-w-0 items-start gap-3">
					<Button
						variant="ghost"
						size="icon"
						className="size-11 shrink-0"
						disabled={save.isPending || uploading}
						onClick={onCancel}
						aria-label="პროდუქტების სიაში დაბრუნება"
					>
						<ArrowLeft size={18} />
					</Button>
					<div className="min-w-0">
						<h2
							ref={heading}
							tabIndex={-1}
							className="m-0 scroll-mt-6 text-2xl leading-relaxed outline-none"
						>
							{product ? "პროდუქტის რედაქტირება" : "ახალი პროდუქტი"}
						</h2>
						<p className="mt-1 mb-0 text-sm text-muted-foreground">
							* აუცილებელი ველია.
						</p>
					</div>
				</div>
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
			</div>
			<fieldset
				disabled={save.isPending}
				className="min-w-0 space-y-5 [&_input:not([type=checkbox]):not([type=file])]:min-h-11"
			>
				<legend className="sr-only">პროდუქტის ინფორმაცია</legend>
				<Card className="gap-5 p-4 shadow-none sm:p-6">
					<h3 className="m-0 text-lg">ძირითადი ინფორმაცია</h3>
					<div className="grid min-w-0 gap-5 sm:grid-cols-2">
						<ProductDetailsFields product={product} categories={categories} />
					</div>
				</Card>
				<Card className="gap-5 p-4 shadow-none sm:p-6">
					<h3 className="m-0 text-lg">ფასი და ხილვადობა</h3>
					<div className="grid min-w-0 gap-5 sm:grid-cols-2">
						<ProductPricingFields product={product} />
					</div>
				</Card>
				<Card className="gap-5 p-4 shadow-none sm:p-6">
					<h3 className="m-0 text-lg">აღწერა და მახასიათებლები</h3>
					<ProductDescriptionFields product={product} />
				</Card>
				<Card className="gap-5 p-4 shadow-none sm:p-6">
					<h3 className="m-0 text-lg">სურათები</h3>
					<ImageEditor
						images={images}
						onChange={setImages}
						onBusy={setUploading}
					/>
				</Card>
			</fieldset>
			<FormError error={save.error} />
			<div className="sticky bottom-0 z-10 mt-6 flex flex-wrap justify-end gap-3 border-t border-border bg-background py-4">
				{uploading && (
					<p role="status" className="m-0 w-full text-sm text-muted-foreground">
						ფოტოები იტვირთება…
					</p>
				)}
				<Button
					variant="outline"
					className="min-h-11 flex-1 px-4 sm:flex-none"
					disabled={save.isPending || uploading}
					onClick={onCancel}
				>
					გაუქმება
				</Button>
				<Button
					type="submit"
					className="min-h-11 flex-1 gap-2 px-4 sm:flex-none"
					disabled={save.isPending || uploading || !categories.length}
				>
					{save.isPending && (
						<LoaderCircle
							size={17}
							className="motion-safe:animate-spin"
							aria-hidden="true"
						/>
					)}
					{save.isPending ? "ინახება…" : "შენახვა"}
				</Button>
			</div>
		</form>
	);
}
