import { randomUUID } from "node:crypto";
import { z } from "zod";
export const uploadInput = z.object({
	type: z.enum(["image/webp", "image/png", "image/jpeg"]),
	size: z
		.number()
		.int()
		.positive()
		.max(5 * 1024 * 1024),
});

export function imageFilename(type: "image/webp" | "image/png" | "image/jpeg") {
	const extension = {
		"image/webp": "webp",
		"image/png": "png",
		"image/jpeg": "jpg",
	}[type];
	return `${randomUUID()}.${extension}`;
}
