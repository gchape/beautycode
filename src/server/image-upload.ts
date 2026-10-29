import { randomUUID } from "node:crypto";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { imageTypes, maxImageUploadBytes } from "../data/image-types.ts";
import { readServerEnvironment } from "./config.ts";

const signatures: Record<keyof typeof imageTypes, (bytes: Buffer) => boolean> =
	{
		"image/webp": (b) =>
			b.toString("ascii", 0, 4) === "RIFF" &&
			b.toString("ascii", 8, 12) === "WEBP",
		"image/png": (b) =>
			b.length >= 8 &&
			b.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
		"image/jpeg": (b) =>
			b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
		"image/avif": (b) =>
			b.length >= 12 &&
			b.toString("ascii", 4, 8) === "ftyp" &&
			/^(avif|avis)$/.test(b.toString("ascii", 8, 12)),
	};

export function detectImageType(
	bytes: Buffer,
): keyof typeof imageTypes | undefined {
	return (Object.keys(signatures) as (keyof typeof imageTypes)[]).find((type) =>
		signatures[type](bytes),
	);
}

export async function saveUploadedImage(bytes: Buffer, contentType: string) {
	if (!bytes.length || bytes.length > maxImageUploadBytes)
		throw new Response("Image exceeds the 5 MB upload limit", { status: 413 });
	const type = detectImageType(bytes);
	if (!type || type !== contentType)
		throw new Response("Unsupported or invalid image file", { status: 400 });
	const directory = resolve(
		readServerEnvironment().UPLOADS_DIR || "data/uploads",
	);
	await mkdir(directory, { recursive: true });
	const name = `${randomUUID()}.${imageTypes[type]}`;
	const temporary = join(directory, `.${name}.tmp`);
	try {
		await writeFile(temporary, bytes, { flag: "wx", mode: 0o644 });
		await rename(temporary, join(directory, name));
	} catch (error) {
		const { unlink } = await import("node:fs/promises");
		await unlink(temporary).catch(() => {});
		throw error;
	}
	return `/uploads/${name}`;
}
