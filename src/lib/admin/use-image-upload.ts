import { type Dispatch, type SetStateAction, useState } from "react";
import type { ProductImage } from "../../data/catalog.ts";
import { maxImagesPerProduct } from "../../data/image-types.ts";
import { uploadImage } from "./upload.ts";

export interface EditableImage extends ProductImage {
	key: string;
}

export function useImageUpload(
	imageCount: number,
	onChange: Dispatch<SetStateAction<EditableImage[]>>,
	onBusy: (busy: boolean) => void,
) {
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");

	async function upload(files: File[]) {
		if (!files.length || busy) return;
		if (imageCount + files.length > maxImagesPerProduct)
			return setError(`მაქსიმუმ ${maxImagesPerProduct} სურათი`);

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
		} catch (err) {
			setError(err instanceof Error ? err.message : "ატვირთვა ვერ შესრულდა");
		} finally {
			// Keep images that uploaded before a later file failed.
			if (added.length) onChange((current) => [...current, ...added]);
			setBusy(false);
			onBusy(false);
		}
	}

	return { busy, error, upload };
}
