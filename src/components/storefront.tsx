import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { ChatProvider } from "./contact/contact-context.tsx";
import { SiteFooter } from "./layout/site-footer.tsx";
import { SiteHeader } from "./layout/site-header.tsx";

export function Storefront({ children }: { children: ReactNode }) {
	return (
		<ChatProvider>
			<Link
				to="/delivery"
				className="flex min-h-10 flex-wrap items-center justify-center gap-3.75 bg-secondary px-4 py-1.75 text-sm tracking-wide max-[560px]:gap-1.75 max-[560px]:text-xs max-[560px]:[&>span]:hidden"
			>
				უფასო მიწოდება მთელ საქართველოში
				<ArrowUpRight size={13} aria-hidden="true" />
			</Link>
			<SiteHeader />
			<main id="main">{children}</main>
			<SiteFooter />
		</ChatProvider>
	);
}
