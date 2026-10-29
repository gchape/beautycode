import { Crisp, type CrispClass } from "crisp-sdk-web";
import { useCallback } from "react";
import { finalPrice, type PublicProduct } from "../data/catalog.ts";

export function createChatLauncher(websiteId: string, sdk: CrispClass = Crisp) {
	let loading: Promise<void> | undefined;

	function load() {
		loading ??= new Promise<void>((resolve, reject) => {
			if (!websiteId) throw new Error("Crisp website ID is missing");
			const timeout = setTimeout(
				() =>
					reject(
						new Error("Crisp could not connect. Reload the page to retry."),
					),
				20_000,
			);
			sdk.session.onLoaded(() => {
				clearTimeout(timeout);
				resolve();
			});
			sdk.configure(websiteId);
		}).catch((error: unknown) => {
			loading = undefined; // allow retry after failure
			throw error;
		});
		return loading;
	}

	async function open(product?: PublicProduct) {
		await load();
		sdk.chat.show();
		sdk.chat.open();
		if (!product) return;

		const url = `${window.location.origin}/products/${encodeURIComponent(product.slug)}`;
		const price = (finalPrice(product) / 100).toFixed(2);
		sdk.message.sendText(
			`გამარჯობა! მაინტერესებს პროდუქტი: ${product.name}\nფასი: ${price} ₾\n${url}`,
		);
	}

	return { load, open };
}

const chat = createChatLauncher(import.meta.env?.VITE_CRISP_WEBSITE_ID ?? "");

export function useChatLauncher(onError: (error: unknown) => void) {
	return useCallback(
		(product?: PublicProduct) => chat.open(product).catch(onError),
		[onError],
	);
}
