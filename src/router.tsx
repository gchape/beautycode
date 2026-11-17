import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { getContext } from "./integrations/tanstack-query/root-provider.tsx";
import { routeTree } from "./routeTree.gen.ts";

export function getRouter() {
	const context = getContext();

	const router = createTanStackRouter({
		routeTree,
		context,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultViewTransition: {
			types: ({ pathChanged, fromLocation, toLocation }) =>
				pathChanged &&
				!fromLocation?.pathname.startsWith("/admin") &&
				!toLocation.pathname.startsWith("/admin") &&
				!window.matchMedia("(prefers-reduced-motion: reduce)").matches
					? ["storefront"]
					: false,
		},
	});

	setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient });

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
