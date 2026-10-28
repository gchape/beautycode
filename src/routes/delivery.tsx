import { createFileRoute } from "@tanstack/react-router";
import { Policy } from "../components/policy";
import { seoHead } from "../lib/seo";

export const Route = createFileRoute("/delivery")({
	head: () =>
		seoHead({
			title: "მიწოდება",
			description: "შეკვეთის დამუშავებისა და საქართველოში მიწოდების პირობები.",
			path: "/delivery",
		}),
	component: () => <Policy page="delivery" />,
});
