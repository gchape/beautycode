import { createFileRoute } from "@tanstack/react-router";
import { adminRequest, readJson } from "../server/admin/http";
import { audit } from "../server/admin/repository";
import { getDatabase } from "../server/database";
import { saveDevelopmentImage } from "../server/local-storage";
import { presignImage } from "../server/storage";
export const Route = createFileRoute("/admin/api/uploads")({
	server: {
		handlers: {
			POST: ({ request }) =>
				adminRequest(request, async (user) => {
					const result = request.headers
						.get("content-type")
						?.startsWith("multipart/form-data")
						? await saveDevelopmentImage(request)
						: await presignImage(await readJson(request));
					audit(getDatabase(), user, "presign", "image", result.imageUrl);
					return result;
				}),
		},
	},
});
