import type { CrispClass } from "crisp-sdk-web";
import { useCallback, useEffect } from "react";
import { finalPrice, type PublicProduct } from "../data/catalog.ts";

const connectTimeoutMs = 20_000;
const autoLoadDelayMs = 1_000;

const productMessage = (product: PublicProduct) =>
	[
		`გამარჯობა! მაინტერესებს პროდუქტი: ${product.name}`,
		`ფასი: ${(finalPrice(product) / 100).toFixed(2)} ₾`,
		`${window.location.origin}/products/${encodeURIComponent(product.slug)}`,
	].join("\n");

export function createChatLauncher(
	websiteId: string,
	providedSdk?: CrispClass,
) {
	let loading: Promise<CrispClass> | undefined;
	let opening: Promise<void> | undefined;

	async function connect() {
		if (!websiteId) throw new Error("Crisp website ID is missing");
		const sdk = providedSdk ?? (await import("crisp-sdk-web")).Crisp;
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
		return sdk;
	}

	const load = () =>
		(loading ??= connect().catch((error: unknown) => {
			loading = undefined;
			throw error;
		}));

	function open(product?: PublicProduct) {
		if (opening) return opening;
		opening = load()
			.then((sdk) => {
				sdk.chat.show();
				sdk.chat.open();
				if (product) sdk.message.sendText(productMessage(product));
			})
			.finally(() => {
				opening = undefined;
			});
		return opening;
	}

	function scheduleLoad() {
		if (!websiteId) return () => {};
		const timer = setTimeout(() => {
			void load().catch(() => {});
		}, autoLoadDelayMs);
		return () => clearTimeout(timer);
	}

	return { load, open, scheduleLoad };
}

const chat = createChatLauncher(import.meta.env?.VITE_CRISP_WEBSITE_ID ?? "");

export function useChatLauncher(onError: (error: unknown) => void) {
	useEffect(() => chat.scheduleLoad(), []);

	return useCallback(
		(product?: PublicProduct) => chat.open(product).catch(onError),
		[onError],
	);
}
