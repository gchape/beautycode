import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useCategories } from "../catalog/category-context.tsx";
import { categoryIcons } from "../category-icons.ts";
import { Button } from "../ui/button.tsx";

export function HomeHero() {
	const categories = useCategories();
	return (
		<section className="site-container home-hero" aria-labelledby="hero-title">
			<div className="flex flex-col items-start justify-center px-6 py-8 sm:p-10 lg:p-14">
				<p className="home-eyebrow mb-6 flex items-center gap-3">
					<span className="h-px w-8 bg-current" aria-hidden="true" /> სილამაზე
					შენებურად
				</p>
				<h1
					id="hero-title"
					className="mb-6 text-[clamp(1.875rem,3.7vw,3.25rem)] leading-[1.3] tracking-tight"
				>
					პატარა რიტუალი.
					<br />
					<span className="text-[#986074]">მეტი დრო შენთვის.</span>
				</h1>
				<p className="mb-8 max-w-md text-sm leading-8 text-muted-foreground sm:text-base">
					მოვლის მოწყობილობები შენი ყოველდღიურობისთვის — შენს სივრცეში, შენს
					რიტმში.
				</p>
				<div className="flex flex-wrap items-center gap-6">
					<Button asChild size="lg" className="w-full px-4 sm:w-auto sm:px-7">
						<Link to="/products" search={{}}>
							აღმოაჩინე კოლექცია <ArrowUpRight size={18} />
						</Link>
					</Button>
					<a
						href="#featured-products"
						className="inline-flex min-h-11 items-center gap-2 text-sm"
					>
						შერჩეული შენთვის <ArrowDown size={16} />
					</a>
				</div>
				<p className="mt-6 mb-0 lg:mt-10 text-xs text-muted-foreground">
					BEAUTY CODE{" "}
					<span className="mx-3" aria-hidden="true">
						/
					</span>{" "}
					ყოველდღიური ზრუნვა
				</p>
			</div>
			<div className="flex flex-col justify-between bg-[#48202e] p-6 text-[#fff5f0] sm:p-10">
				<div className="mb-5 flex flex-wrap items-center justify-between gap-3 lg:mb-8 border-b border-white/20 pb-5">
					<span className="text-xs tracking-[0.16em]">THE CARE EDIT</span>
					<span className="font-serif text-xl italic text-[#e3b6c4]">
						by Beauty Code
					</span>
				</div>
				<div>
					<p className="mb-2 hidden text-xs text-[#e3b6c4] lg:block">
						დაიწყე შენით
					</p>
					<h2 className="mb-7 hidden text-2xl leading-relaxed lg:block">
						რას დაუთმობ
						<br />
						დროს დღეს?
					</h2>
					<nav
						aria-label="მოვლის კატეგორიები"
						className="divide-y divide-white/20"
					>
						{categories.map((category) => {
							const Icon = categoryIcons[category.icon];
							return (
								<Link
									key={category.slug}
									to="/categories/$slug"
									params={{ slug: category.slug }}
									className="flex min-h-12 items-center gap-4 py-3 lg:min-h-16 lg:py-4 hover:text-[#e3b6c4]"
								>
									<Icon size={22} strokeWidth={1.25} aria-hidden="true" />
									<span className="flex-1 text-sm">{category.name}</span>
									<ArrowUpRight size={18} aria-hidden="true" />
								</Link>
							);
						})}
					</nav>
					{!categories.length && (
						<p className="text-sm leading-8 text-[#e3b6c4]">
							ზრუნვა იწყება პატარა ნაბიჯით. აღმოაჩინე შენი ყოველდღიური რიტუალი.
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
