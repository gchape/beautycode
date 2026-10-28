import { createContext, type ReactNode, useContext } from "react";
import type { Product } from "../../data/catalog";
import { useTawkChat } from "../../lib/tawk-chat";

const ContactContext = createContext<(product?: Product) => void>(() => {});

export const useContact = () => useContext(ContactContext);

export function ContactProvider({ children }: { children: ReactNode }) {
	const open = useTawkChat();
	return (
		<ContactContext.Provider value={open}>{children}</ContactContext.Provider>
	);
}
