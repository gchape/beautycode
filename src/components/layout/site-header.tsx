import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { LayoutGroup, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useCategories } from "../catalog/category-context.tsx";
import { ChatButton } from "../contact/chat-button.tsx";
import { MobileMenu } from "./mobile-menu.tsx";

export function SiteHeader() {
	const categories = useCategories();
	const reducedMotion = useReducedMotion();
	return (
		<header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-5 max-[560px]:gap-x-2 max-[560px]:py-3 site-container">
			<Link
				to="/"
				className="flex min-w-0 w-fit items-center gap-2.25 max-[360px]:gap-1.5"
				aria-label="Beauty Code, მთავარი"
			>
				<img
					className="size-17 shrink-0 object-cover mix-blend-multiply max-[1100px]:size-13.75 max-[560px]:size-10 max-[360px]:size-9"
					src="/logo-136.webp"
					srcSet="/logo-68.webp 68w, /logo-136.webp 136w, /logo-204.webp 204w"
					sizes="(max-width: 360px) 2.25rem, (max-width: 560px) 2.5rem, (max-width: 1100px) 3.4375rem, 4.25rem"
					alt="Beauty Code"
					width="68"
					height="68"
				/>
				<span className="min-w-0 text-[1.0625rem] font-semibold tracking-[0.17em] max-[1100px]:text-[0.9375rem] max-[560px]:text-sm max-[560px]:tracking-[0.12em] max-[360px]:text-[0.8125rem] max-[360px]:tracking-[0.08em]">
					BEAUTY CODE
					<small className="mt-1.75 block text-[0.8125rem] font-normal tracking-normal leading-relaxed text-muted-foreground max-[360px]:text-xs">
						სილამაზე შენებურად
					</small>
				</span>
			</Link>
			<LayoutGroup id="site-navigation">
				<nav
					className="site-navigation order-last mt-2 flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-1 border-t border-border pt-3 text-sm leading-relaxed max-[1100px]:hidden"
					aria-label="მთავარი ნავიგაცია"
				>
					<Link to="/products" search={{}} className="relative">
						{({ isActive }) => (
							<>
								ყველა პროდუქტი
								{isActive && (
									<m.span
										layoutId="active-link"
										className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary"
										aria-hidden="true"
									/>
								)}
							</>
						)}
					</Link>
					{categories.map((c) => (
						<Link
							key={c.slug}
							to="/categories/$slug"
							params={{ slug: c.slug }}
							className="relative"
						>
							{({ isActive }) => (
								<>
									{c.name}
									{isActive && (
										<m.span
											layoutId="active-link"
											className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary"
											aria-hidden="true"
										/>
									)}
								</>
							)}
						</Link>
					))}
				</nav>
			</LayoutGroup>
			<div className="ml-auto flex shrink-0 items-center gap-3 max-[560px]:gap-0">
				<Link
					to="/products"
					hash="search"
					hashScrollIntoView={{
						behavior: reducedMotion ? "auto" : "smooth",
						block: "start",
					}}
					onClick={() =>
						document.getElementById("search")?.focus({ preventScroll: true })
					}
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
