import { useCallback, useEffect } from "react";
import { finalPrice, type PublicProduct } from "../data/catalog.ts";
import { site } from "../data/site.ts";

interface TawkAPI {
	onLoad?: () => void;
	maximize?: () => void;
	showWidget?: () => void;
	addEvent?: (
		name: string,
		data: Record<string, string | number>,
		callback: (error?: unknown) => void,
	) => void;
}

declare global {
	interface Window {
		Tawk_API?: TawkAPI;
		Tawk_LoadStart?: Date;
	}
}

let loading: Promise<TawkAPI> | undefined;

function loadChat(): Promise<TawkAPI> {
	if (loading) return loading;
	loading = new Promise((resolve, reject) => {
		window.Tawk_API ||= {};
		const api = window.Tawk_API;
		const previousOnLoad = api.onLoad;
		api.onLoad = () => {
			resolve(window.Tawk_API || api);
			previousOnLoad?.();
		};
		window.Tawk_LoadStart = new Date();
		const script = document.createElement("script");
		script.async = true;
		script.src = site.tawkEmbedUrl;
		script.crossOrigin = "anonymous";
		script.onerror = () => {
			script.remove();
			api.onLoad = previousOnLoad;
			loading = undefined;
			reject(new Error("Chat could not load"));
		};
		document.head.appendChild(script);
	});
	return loading;
}

export function useChatLauncher() {
	useEffect(() => {
		const timer = window.setTimeout(() => {
			void loadChat().catch(() => {});
		}, 1000);
		return () => window.clearTimeout(timer);
	}, []);

	return useCallback(async (product?: PublicProduct) => {
		try {
			const api = await loadChat();
			api.showWidget?.();
			api.maximize?.();
			if (product) {
				api.addEvent?.(
					"product-interest",
					{
						name: product.name,
						price: finalPrice(product) / 100,
						currency: "GEL",
						url: `${window.location.origin}/products/${encodeURIComponent(product.slug)}`,
					},
					() => {},
				);
			}
		} catch {
			/* A blocked widget must not interrupt the storefront. */
		}
	}, []);
}
