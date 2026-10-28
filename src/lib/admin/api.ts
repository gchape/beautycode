import { AdminError } from "./errors.ts";
export async function adminApi<T>(path: string, data?: unknown): Promise<T> {
	const response = await fetch(`/admin/api/${path}`, {
		method: data === undefined ? "GET" : "POST",
		credentials: "same-origin",
		headers: data === undefined ? {} : { "Content-Type": "application/json" },
		body: data === undefined ? undefined : JSON.stringify(data),
	});
	if (!response.ok) {
		const fallback =
			response.status === 401 ? "ავტორიზაცია საჭიროა" : "ოპერაცია ვერ შესრულდა";
		const body = await response.json().catch(() => null);
		throw new AdminError(
			typeof body?.error === "string" ? body.error : fallback,
			body?.fieldErrors || {},
		);
	}
	return response.json();
}
export async function optimizeUpload(file: File): Promise<Blob> {
	if (
		!["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
		file.size > 20 * 1024 * 1024
	)
		throw new Error("აირჩიეთ JPG, PNG ან WebP სურათი, მაქსიმუმ 20 MB");
	const bitmap = await createImageBitmap(file);
	try {
		const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
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
				0.86,
			),
		);
		if (blob.size > 5 * 1024 * 1024) throw new Error("სურათი 5 MB-ზე დიდია");
		return blob;
	} finally {
		bitmap.close();
	}
}
export async function uploadImage(file: File) {
	const blob = await optimizeUpload(file);
	const signed = await adminApi<{
		url: string;
		fields: Record<string, string>;
		imageUrl: string;
	}>("uploads", { type: blob.type, size: blob.size });
	const form = new FormData();
	for (const [key, value] of Object.entries(signed.fields))
		form.append(key, value);
	form.append("file", blob, "product.webp");
	const response = await fetch(signed.url, { method: "POST", body: form });
	if (!response.ok) throw new Error("სურათის ატვირთვა ვერ შესრულდა");
	return signed.imageUrl || (await response.json()).imageUrl;
}
