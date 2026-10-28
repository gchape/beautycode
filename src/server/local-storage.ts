import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { imageFilename, uploadInput } from "./image-upload.ts";
export async function saveDevelopmentImage(request: Request) {
	if (process.env.NODE_ENV !== "development")
		throw new Response("Not found", { status: 404 });
	const form = await readUploadForm(request);
	const file = form.get("file");
	if (!(file instanceof File))
		throw new Response("Missing file", { status: 400 });
	const input = uploadInput.parse({ type: file.type, size: file.size });
	const imageUrl = `/images/dev-${imageFilename(input.type)}`;
	await mkdir("public/images", { recursive: true });
	await writeFile(`public${imageUrl}`, Buffer.from(await file.arrayBuffer()));
	return { imageUrl };
}

export async function putLocalBackup(key: string, body: string) {
	if (!/^backups\/[a-zA-Z0-9._-]+$/.test(key))
		throw new Error("Invalid backup key");
	await mkdir(dirname(key), { recursive: true });
	await writeFile(key, body, { mode: 0o600 });
}

async function readUploadForm(request: Request) {
	const reader = request.body?.getReader();
	if (!reader) throw new Response("Missing file", { status: 400 });
	const chunks: Uint8Array[] = [];
	let size = 0;
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		size += value.byteLength;
		if (size > 5 * 1024 * 1024 + 65536) {
			await reader.cancel();
			throw new Response("Payload too large", { status: 413 });
		}
		chunks.push(value);
	}
	return await new Response(Buffer.concat(chunks), {
		headers: { "Content-Type": request.headers.get("content-type") || "" },
	}).formData();
}
