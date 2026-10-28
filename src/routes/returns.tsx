import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "../components/policy.tsx";
import { seoHead } from "../lib/seo.ts";

export const Route = createFileRoute("/returns")({
	head: () =>
		seoHead({
			title: "დაბრუნების პირობები",
			description: "პროდუქტის დაბრუნებისა და გაცვლის პირობები.",
			path: "/returns",
		}),
	component: () => <PolicyPage page="returns" />,
});
