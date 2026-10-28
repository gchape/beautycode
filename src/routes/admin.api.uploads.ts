import { createFileRoute } from "@tanstack/react-router";
import { adminRequest, readJson } from "../server/admin/http.ts";
import { recordAudit } from "../server/admin/repository.ts";
import { getDatabase } from "../server/database.ts";
import { presignImage } from "../server/storage.ts";

export const Route = createFileRoute("/admin/api/uploads")({
	server: {
		handlers: {
			POST: ({ request }) =>
				adminRequest(request, async (user) => {
					const result = await presignImage(await readJson(request));
					recordAudit(getDatabase(), user, "presign", "image", result.imageUrl);
					return result;
				}),
		},
	},
});
