import { LoaderCircle } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import {
	imageTypeNames,
	maxImagesPerProduct,
	maxImageUploadBytes,
} from "../../data/image-types.ts";
import {
	type EditableImage,
	useImageUpload,
} from "../../lib/admin/use-image-upload.ts";
import { Input } from "../ui/input.tsx";
import { Field } from "./field.tsx";
import { ImageRow } from "./image-row.tsx";

export function ImageEditor({
	images,
	onChange,
}: {
	images: EditableImage[];
	onChange: Dispatch<SetStateAction<EditableImage[]>>;
}) {
	const { busy, error, upload } = useImageUpload(images.length, onChange);
	const full = images.length >= maxImagesPerProduct;
	function move(index: number, delta: number) {
		if (
			index < 0 ||
			index >= images.length ||
			index + delta < 0 ||
			index + delta >= images.length
		)
			return;
		const result = [...images];
		[result[index], result[index + delta]] = [
			result[index + delta],
			result[index],
		];
		onChange(result);
	}
	return (
		<fieldset disabled={busy} className="min-w-0">
			<legend className="sr-only">პროდუქტის ფოტოების მართვა</legend>
			<Field
				label="ფოტოების დამატება"
				hint={`JPG, PNG, WebP, AVIF · ${maxImageUploadBytes / 1024 / 1024} MB-მდე · მაქს. ${maxImagesPerProduct} ფოტო`}
			>
				<Input
					type="file"
					className="py-2"
					accept={imageTypeNames.join(",")}
					multiple
					disabled={full}
					onChange={(event) => {
						upload(Array.from(event.target.files ?? []));
						event.target.value = "";
					}}
				/>
			</Field>
			{full && (
				<p role="status" className="mt-3 text-sm text-muted-foreground">
					ფოტოების ლიმიტი შევსებულია.
				</p>
			)}
			{busy && (
				<p
					role="status"
					className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"
				>
					<LoaderCircle
						size={17}
						className="motion-safe:animate-spin"
						aria-hidden="true"
					/>
					ფოტოები იტვირთება…
				</p>
			)}
			{error && (
				<p
					role="alert"
					className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800"
				>
					{error}
				</p>
			)}
			{images.length > 0 && (
				<p className="mt-5 mb-3 text-[0.8125rem] text-muted-foreground">
					{images.length} / {maxImagesPerProduct} ფოტო · ისრებით შეცვალეთ
					თანმიმდევრობა
				</p>
			)}
			<div className="space-y-3">
				{images.map((image, index) => (
					<ImageRow
						key={image.key}
						image={image}
						index={index}
						last={index === images.length - 1}
						onAltChange={(alt) =>
							onChange(
								images.map((item, i) =>
									i === index ? { ...item, alt } : item,
								),
							)
						}
						onMove={(delta) => move(index, delta)}
						onRemove={() => onChange(images.filter((_, i) => i !== index))}
					/>
				))}
			</div>
		</fieldset>
	);
}
