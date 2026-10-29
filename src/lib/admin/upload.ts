import { adminApi } from "./api.ts";
import { optimizeUpload } from "./image-optimize.ts";

/** Optimizes the file and uploads it through the authenticated application endpoint. */
export async function uploadImage(file: File): Promise<string> {
	const blob = await optimizeUpload(file);
	const form = new FormData();
	form.append("file", blob, "product.webp");
	const result = await adminApi<{ imageUrl: string }>("uploads", form);
	return result.imageUrl;
}
