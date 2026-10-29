import { Crisp, type CrispClass } from "crisp-sdk-web";
import { useCallback } from "react";
import { finalPrice, type PublicProduct } from "../data/catalog.ts";

const connectTimeoutMs = 20_000;

const productMessage = (product: PublicProduct) =>
	[
		`გამარჯობა! მაინტერესებს პროდუქტი: ${product.name}`,
		`ფასი: ${(finalPrice(product) / 100).toFixed(2)} ₾`,
		`${window.location.origin}/products/${encodeURIComponent(product.slug)}`,
	].join("\n");

export function createChatLauncher(websiteId: string, sdk: CrispClass = Crisp) {
	let loading: Promise<void> | undefined;

	async function connect() {
		if (!websiteId) throw new Error("Crisp website ID is missing");
		await new Promise<void>((resolve, reject) => {
			const timer = setTimeout(
				() =>
					reject(
						new Error("Crisp could not connect. Reload the page to retry."),
					),
				connectTimeoutMs,
			);
			sdk.session.onLoaded(() => {
				clearTimeout(timer);
				resolve();
			});
			sdk.configure(websiteId);
		});
	}

	const load = () =>
		(loading ??= connect().catch((error: unknown) => {
			loading = undefined; // allow retry after failure
			throw error;
		}));

	async function open(product?: PublicProduct) {
		await load();
		sdk.chat.show();
		sdk.chat.open();
		if (product) sdk.message.sendText(productMessage(product));
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
