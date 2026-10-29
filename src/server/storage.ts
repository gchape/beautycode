import { createReadStream, createWriteStream } from "node:fs";
import { stat } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { readServerEnvironment } from "./config.ts";

export const getS3Client = async () => {
	const { S3Client } = await import("@aws-sdk/client-s3");
	return new S3Client({
		region: readServerEnvironment().AWS_REGION || "eu-central-1",
	});
};

export async function uploadBackup(key: string, path: string) {
	const { PutObjectCommand } = await import("@aws-sdk/client-s3");
	const Bucket = readServerEnvironment().S3_BACKUPS_BUCKET;
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
	const Bucket = readServerEnvironment().S3_BACKUPS_BUCKET;
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
