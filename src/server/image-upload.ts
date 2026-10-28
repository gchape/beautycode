import { randomUUID } from "node:crypto";
import { z } from "zod";
import {
	type ImageType,
	imageTypeNames,
	imageTypes,
	maxImageUploadBytes,
} from "../data/image-types.ts";

export const uploadInput = z.object({
	type: z.enum(imageTypeNames),
	size: z.number().int().positive().max(maxImageUploadBytes),
});

export function imageFilename(type: ImageType) {
	return `${randomUUID()}.${imageTypes[type]}`;
}
