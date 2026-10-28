import { adminApi } from "./api.ts";
import { optimizeUpload } from "./image-optimize.ts";

interface SignedUpload {
	url: string;
	fields: Record<string, string>;
	imageUrl: string;
}

/** Optimizes the file, gets a presigned POST from the server and uploads it to S3. */
export async function uploadImage(file: File): Promise<string> {
	const blob = await optimizeUpload(file);
	const signed = await adminApi<SignedUpload>("uploads", {
		type: blob.type,
		size: blob.size,
	});
	const form = new FormData();
	for (const [key, value] of Object.entries(signed.fields))
		form.append(key, value);
	form.append("file", blob, "product.webp");
	const response = await fetch(signed.url, { method: "POST", body: form });
	if (!response.ok) throw new Error("სურათის ატვირთვა ვერ შესრულდა");
	return signed.imageUrl;
}
