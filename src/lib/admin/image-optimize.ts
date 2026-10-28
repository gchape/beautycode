import {
	imageTypes,
	maxImageUploadBytes,
	maxSourceImageBytes,
} from "../../data/image-types.ts";

const maxSide = 1600;
const quality = 0.86;

/** Resizes to at most 1600px and re-encodes as WebP before upload. */
export async function optimizeUpload(file: File): Promise<Blob> {
	if (!(file.type in imageTypes) || file.size > maxSourceImageBytes)
		throw new Error("აირჩიეთ JPG, PNG ან WebP სურათი, მაქსიმუმ 20 MB");
	const bitmap = await createImageBitmap(file);
	try {
		const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
		const canvas = document.createElement("canvas");
		canvas.width = Math.max(1, Math.round(bitmap.width * scale));
		canvas.height = Math.max(1, Math.round(bitmap.height * scale));
		const context = canvas.getContext("2d");
		if (!context) throw new Error("სურათი ვერ დამუშავდა");
		context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
		const blob = await new Promise<Blob>((resolve, reject) =>
			canvas.toBlob(
				(value) =>
					value ? resolve(value) : reject(new Error("სურათი ვერ დამუშავდა")),
				"image/webp",
				quality,
			),
		);
		if (blob.size > maxImageUploadBytes)
			throw new Error("სურათი 5 MB-ზე დიდია");
		return blob;
	} finally {
		bitmap.close();
	}
}
