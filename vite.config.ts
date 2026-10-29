import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv } from "vite";

const config = defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), ["VITE_", "DOMAIN", "SITE_URL"]);
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
			devtools(),
			nitro({ rollupConfig: { external: [/^@sentry\//] } }),
			tailwindcss(),
			tanstackStart(),
			viteReact(),
		],
	};
});

export default config;
