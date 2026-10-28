import { createReadStream, createWriteStream } from "node:fs";
import { stat } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { imageFilename, uploadInput } from "./image-upload.ts";

export const getS3Client = async () => {
	const { S3Client } = await import("@aws-sdk/client-s3");
	return new S3Client({ region: process.env.AWS_REGION || "eu-central-1" });
};

export async function presignImage(raw: unknown) {
	const { type, size } = uploadInput.parse(raw);
	const { createPresignedPost } = await import("@aws-sdk/s3-presigned-post");
	const bucket = process.env.S3_IMAGES_BUCKET;
	const base = process.env.IMAGES_BASE_URL;
	if (!bucket || !base)
		throw new Response("Image storage is not configured", { status: 503 });
	const key = `products/${imageFilename(type)}`;
	// A POST policy enforces the byte limit at S3, unlike an unrestricted PUT URL.
	const post = await createPresignedPost(await getS3Client(), {
		Bucket: bucket,
		Key: key,
		Expires: 300,
		Fields: {
			"Content-Type": type,
			"Cache-Control": "public,max-age=31536000,immutable",
		},
		Conditions: [
			["content-length-range", 1, size],
			["eq", "$Content-Type", type],
			["eq", "$Cache-Control", "public,max-age=31536000,immutable"],
		],
	});
	return { ...post, imageUrl: `${base.replace(/\/$/, "")}/${key}` };
}

export async function uploadBackup(key: string, path: string) {
	const { PutObjectCommand } = await import("@aws-sdk/client-s3");
	const Bucket = process.env.S3_BACKUPS_BUCKET;
	if (!Bucket) throw new Error("S3_BACKUPS_BUCKET is required");
	const body = createReadStream(path);
	try {
		await (await getS3Client()).send(
			new PutObjectCommand({
				Bucket,
				Key: key,
				Body: body,
				ContentLength: (await stat(path)).size,
				ContentType: "application/vnd.sqlite3",
				ServerSideEncryption: "AES256",
			}),
		);
	} finally {
		body.destroy();
	}
}

export async function downloadBackup(key: string, path: string) {
	const { GetObjectCommand } = await import("@aws-sdk/client-s3");
	const Bucket = process.env.S3_BACKUPS_BUCKET;
	if (!Bucket) throw new Error("S3_BACKUPS_BUCKET is required");
	const result = await (await getS3Client()).send(
		new GetObjectCommand({ Bucket, Key: key }),
	);
	if (!result.Body) throw new Error("Empty backup");
	await pipeline(
		result.Body.transformToWebStream(),
		createWriteStream(path, { flags: "wx", mode: 0o600 }),
	);
}
