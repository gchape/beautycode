import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv, type Plugin } from "vite";

function developmentUploads(directory: string): Plugin {
	return {
		name: "beautycode-development-uploads",
		apply: "serve",
		configureServer(server) {
			server.middlewares.use("/uploads", async (request, response, next) => {
				if (request.method !== "GET" && request.method !== "HEAD") {
					next();
					return;
				}

				const name = request.url?.split("?", 1)[0]?.slice(1) ?? "";
				if (
					!/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\.(?:webp|png|jpg|avif)$/.test(
						name,
					)
				) {
					next();
					return;
				}

				try {
					const contents = await readFile(join(directory, name));
					const extension = name.slice(name.lastIndexOf(".") + 1);
					const contentTypes = {
						avif: "image/avif",
						jpg: "image/jpeg",
						png: "image/png",
						webp: "image/webp",
					} as const;
					response.statusCode = 200;
					response.setHeader(
						"Content-Type",
						contentTypes[extension as keyof typeof contentTypes],
					);
					response.setHeader("Cache-Control", "no-store");
					response.end(request.method === "HEAD" ? undefined : contents);
				} catch (error) {
					if (
						error instanceof Error &&
						"code" in error &&
						error.code === "ENOENT"
					) {
						response.statusCode = 404;
						response.end();
						return;
					}
					next(error instanceof Error ? error : new Error(String(error)));
				}
			});
		},
	};
}

const config = defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), [
		"VITE_",
		"DOMAIN",
		"SITE_URL",
		"DB_PATH",
		"UPLOADS_DIR",
	]);
	const isDevelopmentServer = command === "serve" && mode === "development";
	if (isDevelopmentServer) {
		process.env.NODE_ENV = "development";
		process.env.DB_PATH ||= env.DB_PATH || "data-dev/beautycode.db";
		process.env.UPLOADS_DIR ||= env.UPLOADS_DIR || "data-dev/uploads";
	}
	const siteUrl =
		process.env.VITE_SITE_URL ||
		env.VITE_SITE_URL ||
		env.SITE_URL ||
		(env.DOMAIN ? `https://${env.DOMAIN}` : undefined);

	return {
		define: siteUrl
			? { "import.meta.env.VITE_SITE_URL": JSON.stringify(siteUrl) }
			: undefined,
		resolve: { tsconfigPaths: true },
		plugins: [
			...(isDevelopmentServer
				? [
						developmentUploads(
							resolve(process.env.UPLOADS_DIR ?? "data-dev/uploads"),
						),
					]
				: []),
			devtools(),
			nitro({ rollupConfig: { external: [/^@sentry\//] } }),
			tailwindcss(),
			tanstackStart(),
			viteReact(),
		],
	};
});

export default config;
