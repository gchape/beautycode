import { imageFilename, uploadInput } from "./image-upload.ts";
import { putLocalBackup } from "./local-storage.ts";

export const s3 = async () => {
	const { S3Client } = await import("@aws-sdk/client-s3");
	return new S3Client({ region: process.env.AWS_REGION || "eu-central-1" });
};
export async function presignImage(raw: unknown) {
	const { type, size } = uploadInput.parse(raw);
	if (process.env.NODE_ENV === "development")
		return { url: "/admin/api/uploads", fields: {}, imageUrl: "" };
	const { createPresignedPost } = await import("@aws-sdk/s3-presigned-post");
	const bucket = process.env.S3_IMAGES_BUCKET;
	const base = process.env.IMAGES_BASE_URL;
	if (!bucket || !base)
		throw new Response("Image storage is not configured", { status: 503 });
	const key = `products/${imageFilename(type)}`;
	// A POST policy enforces the byte limit at S3, unlike an unrestricted PUT URL.
	const post = await createPresignedPost(await s3(), {
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
export async function putBackup(key: string, body: string) {
	if (process.env.NODE_ENV === "development") return putLocalBackup(key, body);
	const { PutObjectCommand } = await import("@aws-sdk/client-s3");
	const Bucket = process.env.S3_BACKUPS_BUCKET;
	if (!Bucket) throw new Error("S3_BACKUPS_BUCKET is required");
	await (await s3()).send(
		new PutObjectCommand({
			Bucket,
			Key: key,
			Body: body,
			ContentType: "application/json",
			ServerSideEncryption: "AES256",
		}),
	);
}
export async function getBackup(key: string) {
	const { GetObjectCommand } = await import("@aws-sdk/client-s3");
	if (!process.env.S3_BACKUPS_BUCKET)
		throw new Error("S3_BACKUPS_BUCKET is required");
	const result = await (await s3()).send(
		new GetObjectCommand({ Bucket: process.env.S3_BACKUPS_BUCKET, Key: key }),
	);
	if (!result.Body) throw new Error("Empty backup");
	return result.Body.transformToString();
}
