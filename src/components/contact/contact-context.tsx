import { createContext, type ReactNode, useContext } from "react";
import type { PublicProduct } from "../../data/catalog.ts";
import { useChatLauncher } from "../../lib/tawk-chat.ts";

const ChatContext = createContext<(product?: PublicProduct) => void>(() => {});

export const useOpenChat = () => useContext(ChatContext);

export function ChatProvider({ children }: { children: ReactNode }) {
	const openChat = useChatLauncher();
	return (
		<ChatContext.Provider value={openChat}>{children}</ChatContext.Provider>
	);
}
