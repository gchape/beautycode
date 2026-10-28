import { z } from "zod";
import { validationDetails } from "../../lib/admin/errors.ts";
import { requireAdmin } from "./auth.ts";

export async function adminRequest(
	request: Request,
	handler: (user: string) => unknown | Promise<unknown>,
) {
	try {
		const user = requireAdmin(request);
		const result = await handler(user);
		return Response.json(result, {
			headers: {
				"Cache-Control": "no-store",
				"X-Robots-Tag": "noindex, nofollow",
			},
		});
	} catch (error) {
		if (error instanceof Response) return error;
		if (error instanceof z.ZodError) {
			const { message, fieldErrors } = validationDetails(error);
			return Response.json({ error: message, fieldErrors }, { status: 400 });
		}

		if (error instanceof SyntaxError)
			return Response.json({ error: "არასწორი მონაცემები" }, { status: 400 });
		if (error instanceof Error && /UNIQUE constraint/.test(error.message))
			return Response.json(
				{ error: "ეს კოდი უკვე გამოყენებულია" },
				{ status: 409 },
			);
		console.error("Admin request failed", error);
		return Response.json(
			{ error: "ოპერაცია ვერ შესრულდა. სცადეთ ხელახლა." },
			{ status: 500 },
		);
	}
}
export async function readJson(request: Request): Promise<unknown> {
	const raw = await request.text();
	if (raw.length > 128000)
		throw new Response("Payload too large", { status: 413 });
	return JSON.parse(raw);
}
