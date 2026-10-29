import { z } from "zod";
import { validationDetails } from "../../lib/admin/errors.ts";
import { requireAdmin } from "./auth.ts";

const maxJsonLength = 128_000;

const privateHeaders = {
	"Cache-Control": "no-store",
	"X-Robots-Tag": "noindex, nofollow",
};

const json = (body: unknown, status = 200) =>
	Response.json(body, { status, headers: privateHeaders });

export async function adminRequest(
	request: Request,
	handler: (user: string) => unknown,
) {
	try {
		return json(await handler(requireAdmin(request)));
	} catch (error) {
		return adminErrorResponse(error);
	}
}

function adminErrorResponse(error: unknown) {
	if (error instanceof Response) return error;

	if (error instanceof z.ZodError) {
		const { message, fieldErrors } = validationDetails(error);
		return json({ error: message, fieldErrors }, 400);
	}
	if (error instanceof SyntaxError)
		return json({ error: "არასწორი მონაცემები" }, 400);
	if (error instanceof Error && error.message.includes("UNIQUE constraint"))
		return json({ error: "ეს კოდი უკვე გამოყენებულია" }, 409);

	console.error("Admin request failed", error);
	return json({ error: "ოპერაცია ვერ შესრულდა. სცადეთ ხელახლა." }, 500);
}

export async function readJson(request: Request): Promise<unknown> {
	const raw = await request.text();
	if (raw.length > maxJsonLength)
		throw new Response("Payload too large", { status: 413 });
	return JSON.parse(raw);
}
