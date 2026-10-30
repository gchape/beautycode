import { randomUUID } from "node:crypto";
import { v2 as cloudinary } from "cloudinary";
import { imageTypes, maxImageUploadBytes } from "../data/image-types.ts";
import { readServerEnvironment } from "./config.ts";

type ImageType = keyof typeof imageTypes;

const hasPrefix = (b: Buffer, prefix: number[], offset = 0) =>
	prefix.every((byte, i) => b[offset + i] === byte);

const ascii = (b: Buffer, start: number, end: number) =>
	b.toString("ascii", start, end);

const signatures: Record<ImageType, (b: Buffer) => boolean> = {
	"image/png": (b) => hasPrefix(b, [137, 80, 78, 71, 13, 10, 26, 10]),
	"image/jpeg": (b) => hasPrefix(b, [0xff, 0xd8, 0xff]),
	"image/webp": (b) => ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 12) === "WEBP",
	"image/avif": (b) =>
		ascii(b, 4, 8) === "ftyp" && ["avif", "avis"].includes(ascii(b, 8, 12)),
};

export function detectImageType(bytes: Buffer): ImageType | undefined {
	return (Object.keys(signatures) as ImageType[]).find((type) =>
		signatures[type](bytes),
	);
}

const httpError = (message: string, status: number) =>
	new Response(message, { status });

export async function saveUploadedImage(bytes: Buffer, contentType: string) {
	if (!bytes.length || bytes.length > maxImageUploadBytes)
		throw httpError("Image exceeds the 5 MB upload limit", 413);

	if (detectImageType(bytes) !== contentType)
		throw httpError("Unsupported or invalid image file", 400);

	const env = readServerEnvironment();
	const cloudName = env.CLOUDINARY_CLOUD_NAME;
	const apiKey = env.CLOUDINARY_API_KEY;
	const apiSecret = env.CLOUDINARY_API_SECRET;
	if (!cloudName || !apiKey || !apiSecret)
		throw httpError("Image uploads are not configured", 503);

	return new Promise<string>((resolve, reject) => {
		const fail = () =>
			reject(httpError("Image upload failed. Please try again.", 502));

		cloudinary.uploader
			.upload_stream(
				{
					cloud_name: cloudName,
					api_key: apiKey,
					api_secret: apiSecret,
					resource_type: "image",
					public_id: randomUUID(),
					overwrite: false,
					allowed_formats: Object.values(imageTypes),
					timeout: 60000,
				},
				(error, result) =>
					error || !result?.secure_url ? fail() : resolve(result.secure_url),
			)
			.on("error", fail)
			.end(bytes);
	});
}
