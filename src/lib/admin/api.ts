import { AdminError } from "./errors.ts";

const messages = {
	unauthorized: "ავტორიზაცია საჭიროა",
	failed: "ოპერაცია ვერ შესრულდა",
};

function requestInit(data?: unknown): RequestInit {
	const init: RequestInit = { credentials: "same-origin" };
	if (data === undefined) return init;

	// For FormData the browser sets the multipart Content-Type and boundary.
	if (data instanceof FormData) return { ...init, method: "POST", body: data };

	return {
		...init,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};
}

export async function adminApi<T>(path: string, data?: unknown): Promise<T> {
	const response = await fetch(`/admin/api/${path}`, requestInit(data));

	if (!response.ok) {
		const body = await response.json().catch(() => null);
		const fallback =
			response.status === 401 ? messages.unauthorized : messages.failed;
		throw new AdminError(
			typeof body?.error === "string" ? body.error : fallback,
			body?.fieldErrors ?? {},
		);
	}
	return response.json();
}
