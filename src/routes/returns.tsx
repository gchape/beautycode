import { createFileRoute } from "@tanstack/react-router";
import { Policy } from "../components/policy";
import { seoHead } from "../lib/seo";

export const Route = createFileRoute("/returns")({
	head: () =>
		seoHead({
			title: "დაბრუნების პირობები",
			description: "პროდუქტის დაბრუნებისა და გაცვლის პირობები.",
			path: "/returns",
		}),
	component: () => <Policy page="returns" />,
});
