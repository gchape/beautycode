import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { ChatProvider } from "./contact/contact-context.tsx";
import { SiteFooter } from "./layout/site-footer.tsx";
import { SiteHeader } from "./layout/site-header.tsx";

export function Storefront({ children }: { children: ReactNode }) {
	return (
		<ChatProvider>
			<div className="flex min-h-[34px] flex-wrap items-center justify-center gap-[15px] bg-secondary px-4 py-[7px] text-sm tracking-[0.025em] max-[560px]:gap-[7px] max-[560px]:text-xs max-[560px]:[&>span]:hidden">
				უფასო მიწოდება მთელ საქართველოში
				<ArrowUpRight size={13} />
			</div>
			<SiteHeader />
			<main id="main">{children}</main>
			<SiteFooter />
		</ChatProvider>
	);
}
