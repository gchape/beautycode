import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { ChatProvider } from "./contact/contact-context.tsx";
import { SiteFooter } from "./layout/site-footer.tsx";
import { SiteHeader } from "./layout/site-header.tsx";

export function Storefront({ children }: { children: ReactNode }) {
	return (
		<ChatProvider>
			<div className="announcement">
				უფასო მიწოდება მთელ საქართველოში
				<ArrowUpRight size={13} />
			</div>
			<SiteHeader />
			<main id="main">{children}</main>
			<SiteFooter />
		</ChatProvider>
	);
}
