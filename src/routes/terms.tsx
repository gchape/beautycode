import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "../components/policy.tsx";
import { seoHead } from "../lib/seo.ts";

export const Route = createFileRoute("/terms")({
	head: () =>
		seoHead({
			title: "წესები და პირობები",
			description: "Beauty Code-ის მომსახურების წესები და პირობები.",
			path: "/terms",
		}),
	component: () => <PolicyPage page="terms" />,
});
