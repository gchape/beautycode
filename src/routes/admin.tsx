import { createFileRoute } from "@tanstack/react-router";
import { AdminPanel } from "../components/admin/admin-panel.tsx";
export const Route = createFileRoute("/admin")({
	head: () => ({
		meta: [
			{ title: "ადმინისტრირება | Beauty Code" },
			{ name: "robots", content: "noindex, nofollow" },
		],
	}),
	component: AdminPanel,
});
