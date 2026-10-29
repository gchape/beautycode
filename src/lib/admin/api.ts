import { AdminError } from "./errors.ts";

export async function adminApi<T>(path: string, data?: unknown): Promise<T> {
	const hasBody = data !== undefined;
	const multipart = typeof FormData !== "undefined" && data instanceof FormData;
	const response = await fetch(`/admin/api/${path}`, {
		method: hasBody ? "POST" : "GET",
		credentials: "same-origin",
		headers:
			hasBody && !multipart ? { "Content-Type": "application/json" } : {},
		body: hasBody ? (multipart ? data : JSON.stringify(data)) : undefined,
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
