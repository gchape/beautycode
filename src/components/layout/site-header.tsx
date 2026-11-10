import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useCategories } from "../catalog/category-context.tsx";
import { ChatButton } from "../contact/chat-button.tsx";
import { MobileMenu } from "./mobile-menu.tsx";

export function SiteHeader() {
	const categories = useCategories();
	return (
		<header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0 py-5 max-[560px]:gap-x-2 max-[560px]:py-3 site-container">
			<Link
				to="/"
				className="flex min-w-0 w-fit items-center gap-2.25"
				aria-label="Beauty Code, მთავარი"
			>
				<img
					className="size-17 shrink-0 object-cover mix-blend-multiply max-[1100px]:size-13.75 max-[560px]:size-10"
					src="/logo-136.webp"
					srcSet="/logo-68.webp 68w, /logo-136.webp 136w, /logo-204.webp 204w"
					sizes="(max-width: 560px) 2.5rem, (max-width: 1100px) 3.4375rem, 4.25rem"
					alt="Beauty Code"
					width="68"
					height="68"
				/>
				<span className="min-w-0 text-[1.0625rem] font-semibold tracking-[0.17em] max-[1100px]:text-[0.9375rem] max-[560px]:text-sm max-[560px]:tracking-[0.12em]">
					BEAUTY CODE
					<small className="mt-1.75 block text-xs font-normal tracking-[0.06em] max-[560px]:text-[0.8125rem]">
						სილამაზე შენებურად
					</small>
				</span>
			</Link>
			<nav
				className="site-navigation col-span-2 row-start-2 mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 border-t border-border pt-3 text-sm leading-relaxed max-[1100px]:hidden"
				aria-label="მთავარი ნავიგაცია"
			>
				<Link to="/products" search={{}}>
					ყველა პროდუქტი
				</Link>
				{categories.map((c) => (
					<Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }}>
						{c.name}
					</Link>
				))}
			</nav>
			<div className="col-start-2 row-start-1 flex shrink-0 items-center gap-3 max-[560px]:gap-0">
				<Link
					to="/products"
					hash="search"
					onClick={() => document.getElementById("search")?.focus()}
					search={{}}
					className="inline-flex size-11 items-center justify-center rounded-md hover:bg-muted"
					aria-label="პროდუქტის ძებნა"
				>
					<Search size={21} />
				</Link>
				<ChatButton
					variant="outline"
					className="min-h-10 px-4.25 py-2 max-[1100px]:px-3 max-[560px]:hidden"
				>
					მოგვწერე
				</ChatButton>
				<MobileMenu />
			</div>
		</header>
	);
}
