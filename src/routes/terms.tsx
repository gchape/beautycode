import { createFileRoute } from "@tanstack/react-router";
import { Policy } from "../components/policy";
import { seoHead } from "../lib/seo";

export const Route = createFileRoute("/terms")({
	head: () =>
		seoHead({
			title: "წესები და პირობები",
			description: "Beauty Code-ის მომსახურების წესები და პირობები.",
			path: "/terms",
		}),
	component: () => <Policy page="terms" />,
});
