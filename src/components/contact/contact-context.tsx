import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";
import type { PublicProduct } from "../../data/catalog.ts";
import { site } from "../../data/site.ts";
import { useChatLauncher } from "../../lib/crisp-chat.ts";

const ChatContext = createContext<(product?: PublicProduct) => void>(() => {});
export const useOpenChat = () => useContext(ChatContext);

export function ChatProvider({ children }: { children: ReactNode }) {
	const [failed, setFailed] = useState(false);
	const onError = useCallback(() => setFailed(true), []);
	const launch = useChatLauncher(onError);
	const openChat = useCallback(
		(product?: PublicProduct) => {
			setFailed(false);
			void launch(product);
		},
		[launch],
	);
	return (
		<ChatContext.Provider value={openChat}>
			{children}
			{failed && (
				<div
					role="alert"
					className="fixed bottom-4 left-4 z-[2147483647] w-[calc(100%-32px)] max-w-sm rounded-lg border border-border bg-background p-5 shadow-lg"
				>
					<p className="mb-3 text-sm">
						ჩატი ვერ ჩაიტვირთა. განაახლე გვერდი ან დაგვირეკე.
					</p>
					<div className="flex flex-wrap items-center justify-between gap-3 text-sm">
						<a className="underline" href={`tel:${site.phone.e164}`}>
							{site.phone.display}
						</a>
						<button
							type="button"
							className="min-h-11 px-3"
							onClick={() => setFailed(false)}
						>
							დახურვა
						</button>
					</div>
				</div>
			)}
		</ChatContext.Provider>
	);
}
