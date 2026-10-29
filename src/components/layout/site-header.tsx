import { Link } from "@tanstack/react-router";
import { MessageCircle, Search } from "lucide-react";
import { useCategories } from "../catalog/category-context.tsx";
import { useOpenChat } from "../contact/contact-context.tsx";
import { Button } from "../ui/button.tsx";
import { MobileMenu } from "./mobile-menu.tsx";

export function SiteHeader() {
	const categories = useCategories();
	const openChat = useOpenChat();
	return (
		<header className="flex h-28 items-center justify-between gap-6 max-[1100px]:gap-3.75 max-[560px]:h-21.75 max-[560px]:gap-2 mx-auto w-[min(1240px,calc(100%-80px))] max-[1100px]:w-[calc(100%-48px)] max-[560px]:w-[calc(100%-32px)]">
			<Link
				to="/"
				className="flex shrink-0 items-center gap-2.25"
				aria-label="Beauty Code, მთავარი"
			>
				<img
					className="size-17 object-cover mix-blend-multiply max-[1100px]:size-13.75 max-[560px]:size-11.75"
					src="/logo.jpg"
					alt="Beauty Code"
					width="82"
					height="82"
				/>
				<span className="text-[1.0625rem] font-semibold tracking-[0.17em] max-[1100px]:text-[0.9375rem] max-[560px]:text-sm">
					BEAUTY CODE
					<small className="mt-1.75 block text-xs font-normal tracking-[0.06em] max-[560px]:text-[0.6875rem]">
						სილამაზე შენებურად
					</small>
				</span>
			</Link>
			<nav
				className="flex items-center gap-1.5 text-sm leading-[1.6] max-[1100px]:hidden [&_a]:rounded-md [&_a]:px-2.25 [&_a]:py-2 [&_a:hover]:bg-muted [&_a:hover]:text-[#975c70] [&_a[aria-current=page]]:bg-muted [&_a[aria-current=page]]:text-primary"
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
			<div className="flex items-center gap-3.75 max-[1100px]:gap-2 max-[560px]:gap-1">
				<Link
					to="/products"
					search={{}}
					className="inline-flex size-9 min-h-9 items-center justify-center gap-0 bg-transparent p-0"
					aria-label="პროდუქტის ძებნა"
				>
					<Search size={21} />
				</Link>
				<Button
					variant="outline"
					onClick={() => openChat()}
					className="min-h-10 px-4.25 py-2 max-[1100px]:px-3 max-[560px]:hidden"
				>
					<MessageCircle size={17} /> მოგვწერე
				</Button>
				<MobileMenu />
			</div>
		</header>
	);
}
