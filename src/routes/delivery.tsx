import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "../components/policy.tsx";
import { seoHead } from "../lib/seo.ts";

export const Route = createFileRoute("/delivery")({
	head: () =>
		seoHead({
			title: "მიწოდება",
			description: "შეკვეთის დამუშავებისა და საქართველოში მიწოდების პირობები.",
			path: "/delivery",
		}),
	component: () => <PolicyPage page="delivery" />,
});
