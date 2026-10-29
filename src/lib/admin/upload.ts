import { imageTypes, maxImageUploadBytes } from "../../data/image-types.ts";
import { adminApi } from "./api.ts";

const invalidImageMessage =
	"აირჩიეთ JPG, PNG, WebP ან AVIF სურათი, მაქსიმუმ 5 MB";

/** Send the original image; Cloudinary handles delivery transformations. */
export async function uploadImage(file: File): Promise<string> {
	const valid =
		Object.hasOwn(imageTypes, file.type) &&
		file.size > 0 &&
		file.size <= maxImageUploadBytes;
	if (!valid) throw new Error(invalidImageMessage);

	const form = new FormData();
	form.append("file", file);
	const { imageUrl } = await adminApi<{ imageUrl: string }>("uploads", form);
	return imageUrl;
}
