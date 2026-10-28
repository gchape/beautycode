import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { ContactProvider } from "./contact/contact-context";
import { SiteFooter } from "./layout/site-footer";
import { SiteHeader } from "./layout/site-header";

export function Storefront({ children }: { children: ReactNode }) {
	return (
		<ContactProvider>
			<div className="announcement">
				უფასო მიწოდება მთელ საქართველოში
				<ArrowUpRight size={13} />
			</div>
			<SiteHeader />
			<main id="main">{children}</main>
			<SiteFooter />
		</ContactProvider>
	);
}
