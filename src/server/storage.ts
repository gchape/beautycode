import { createReadStream, createWriteStream } from "node:fs";
import { stat } from "node:fs/promises";
import type { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { readServerEnvironment } from "./config.ts";

// Lazy import keeps the AWS SDK out of the cold-start path for non-backup code.
async function s3() {
	const sdk = await import("@aws-sdk/client-s3");
	const { AWS_REGION, S3_BACKUPS_BUCKET: Bucket } = readServerEnvironment();
	if (!Bucket) throw new Error("S3_BACKUPS_BUCKET is required");
	return {
		sdk,
		Bucket,
		client: new sdk.S3Client({ region: AWS_REGION || "eu-central-1" }),
	};
}

export async function uploadBackup(key: string, path: string) {
	const { sdk, Bucket, client } = await s3();
	const body = createReadStream(path);
	try {
		await client.send(
			new sdk.PutObjectCommand({
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
		client.destroy();
	}
}

export async function downloadBackup(key: string, path: string) {
	const { sdk, Bucket, client } = await s3();
	try {
		const { Body } = await client.send(
			new sdk.GetObjectCommand({ Bucket, Key: key }),
		);
		if (!Body) throw new Error("Empty backup");
		await pipeline(
			Body as Readable,
			createWriteStream(path, { flags: "wx", mode: 0o600 }),
		);
	} finally {
		client.destroy();
	}
}
