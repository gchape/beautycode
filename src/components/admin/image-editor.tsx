import { type Dispatch, type SetStateAction, useState } from "react";
import type { ProductImage } from "../../data/catalog.ts";
import { imageTypeNames, maxImagesPerProduct } from "../../data/image-types.ts";
import { uploadImage } from "../../lib/admin/upload.ts";
import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";

export interface EditableImage extends ProductImage {
	key: string;
}

export function ImageEditor({
	images,
	onChange,
	onBusy,
}: {
	images: EditableImage[];
	onChange: Dispatch<SetStateAction<EditableImage[]>>;
	onBusy: (busy: boolean) => void;
}) {
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	async function upload(files: File[]) {
		if (!files.length || busy) return;
		if (images.length + files.length > maxImagesPerProduct) {
			setError("მაქსიმუმ 12 სურათი");
			return;
		}
		setBusy(true);
		onBusy(true);
		setError("");
		const added: EditableImage[] = [];
		try {
			for (const file of files)
				added.push({
					key: crypto.randomUUID(),
					url: await uploadImage(file),
					alt: "",
				});
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "ატვირთვა ვერ შესრულდა",
			);
		} finally {
			onChange((current) => [...current, ...added]);
			setBusy(false);
			onBusy(false);
		}
	}
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
		<fieldset disabled={busy} className="admin-images">
			<legend>სურათები — პირველი სურათი მთავარია</legend>
			<Input
				type="file"
				accept={imageTypeNames.join(",")}
				multiple
				aria-label="სურათების ატვირთვა"
				onChange={(e) => {
					// Snapshot the selection before clearing the input for repeat uploads.
					void upload(Array.from(e.target.files ?? []));
					e.target.value = "";
				}}
			/>
			{busy && <p role="status">იტვირთება…</p>}
			{error && <p role="alert">{error}</p>}
			{images.map((image, index) => (
				<div className="admin-image" key={image.key}>
					<img
						src={image.url}
						alt={image.alt || `სურათი ${index + 1}`}
						width="80"
						height="80"
					/>
					<Input
						aria-label={`სურათის ${index + 1} აღწერა`}
						placeholder="სურათის აღწერა"
						value={image.alt}
						onChange={(e) =>
							onChange(
								images.map((item, i) =>
									i === index ? { ...item, alt: e.target.value } : item,
								),
							)
						}
					/>
					<Button
						type="button"
						variant="outline"
						disabled={index === 0}
						onClick={() => move(index, -1)}
						aria-label="წინ გადატანა"
					>
						↑
					</Button>
					<Button
						type="button"
						variant="outline"
						disabled={index === images.length - 1}
						onClick={() => move(index, 1)}
						aria-label="უკან გადატანა"
					>
						↓
					</Button>
					<Button
						type="button"
						variant="ghost"
						onClick={() => onChange(images.filter((_, i) => i !== index))}
					>
						წაშლა
					</Button>
				</div>
			))}
		</fieldset>
	);
}
