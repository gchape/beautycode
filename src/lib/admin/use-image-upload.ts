import { useMutation } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import type { ProductImage } from "../../data/catalog.ts";
import { maxImagesPerProduct } from "../../data/image-types.ts";
import { uploadImage } from "./upload.ts";

export interface EditableImage extends ProductImage {
	key: string;
}

export const imageUploadKey = ["admin", "images"] as const;

export function useImageUpload(
	imageCount: number,
	onChange: Dispatch<SetStateAction<EditableImage[]>>,
) {
	const { isPending, error, mutate } = useMutation({
		mutationKey: imageUploadKey,
		mutationFn: async (files: File[]) => {
			if (imageCount + files.length > maxImagesPerProduct)
				throw new Error(`მაქსიმუმ ${maxImagesPerProduct} სურათი`);
			const added: EditableImage[] = [];
			try {
				for (const file of files)
					added.push({
						key: crypto.randomUUID(),
						url: await uploadImage(file),
						alt: "",
					});
			} finally {
				if (added.length) onChange((current) => [...current, ...added]);
			}
		},
	});
	return {
		busy: isPending,
		error: error?.message,
		upload: (files: File[]) => {
			if (files.length && !isPending) mutate(files);
		},
	};
}
