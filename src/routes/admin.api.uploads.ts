import { createFileRoute } from "@tanstack/react-router";
import { adminRequest } from "../server/admin/http.ts";
import { recordAudit } from "../server/admin/repository.ts";
import { getDatabase } from "../server/database.ts";
import { saveUploadedImage } from "../server/image-upload.ts";

export const Route = createFileRoute("/admin/api/uploads")({
	server: {
		handlers: {
			POST: ({ request }) =>
				adminRequest(request, async (user) => {
					const form = await request.formData();
					const file = form.get("file");
					if (!(file instanceof File))
						throw new Response("Image file is required", { status: 400 });
					const imageUrl = await saveUploadedImage(
						Buffer.from(await file.arrayBuffer()),
						file.type,
					);
					recordAudit(getDatabase(), user, "upload", "image", imageUrl);
					return { imageUrl };
				}),
		},
	},
});
