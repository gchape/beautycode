import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useCategories } from "../catalog/category-context.tsx";
import { categoryIcons } from "../category-icons.ts";
import { Card } from "../ui/card.tsx";

const categoryColors = [
	"bg-[#f0e4e7]",
	"bg-[#eee9e3]",
	"bg-[#e8ede7]",
	"bg-[#e9f1f2]",
];

export function CategoryShowcase() {
	const categories = useCategories();
	return (
		<section className="mx-auto w-[min(1240px,calc(100%-80px))] max-[1100px]:w-[calc(100%-48px)] max-[560px]:w-[calc(100%-32px)] pt-[66px] max-[560px]:pt-[42px]">
			<div className="mb-[27px] flex items-end justify-between gap-5 [&_h2]:mt-3 [&_h2]:mb-0 [&_h2]:text-[1.8125rem] max-[560px]:items-start max-[560px]:[&_h2]:text-2xl">
				<div>
					<span className="block text-[0.8125rem] font-medium tracking-[0.13em] max-[560px]:text-xs">
						მოვლა შენებურად
					</span>
					<h2>იპოვე შენი რჩეული</h2>
				</div>
				<span className="text-muted-foreground text-sm max-[1100px]:hidden">
					ყველაფერი შენი სილამაზის რიტუალისთვის
				</span>
			</div>
			<div className="grid grid-cols-4 gap-[22px] max-[1100px]:grid-cols-2 max-[800px]:gap-3 max-[560px]:grid-cols-1 max-[560px]:gap-3.5">
				{categories.map((c, i) => {
					const Icon = categoryIcons[c.icon];
					return (
						<Card
							asChild
							key={c.slug}
							className={`group relative flex min-h-[280px] flex-col items-start gap-0 overflow-hidden rounded-lg border-0 px-[29px] py-[25px] shadow-none max-[800px]:min-h-[260px] max-[800px]:p-5 max-[560px]:min-h-40 max-[560px]:justify-end max-[560px]:p-[25px] ${categoryColors[i % categoryColors.length]}`}
						>
							<Link to="/categories/$slug" params={{ slug: c.slug }}>
								<span className="font-[Georgia,serif] text-[0.9375rem] text-[#987783] max-[560px]:absolute max-[560px]:top-5 max-[560px]:left-[25px]">
									{String(i + 1).padStart(2, "0")}
								</span>
								<Icon
									className="my-[15px] mb-6 self-center text-[#84616a] transition-transform duration-300 group-hover:-rotate-8 group-hover:scale-[1.08] max-[560px]:absolute max-[560px]:top-[25px] max-[560px]:right-[25px] max-[560px]:m-0 max-[560px]:size-[65px]"
									size={75}
									strokeWidth={0.8}
								/>
								<div>
									<h3 className="mb-2 text-[1.3125rem] max-[800px]:text-lg max-[560px]:text-[1.3125rem]">
										{c.name}
									</h3>
									<p className="m-0 text-[0.8125rem] text-[#79656a]">
										{c.description}
									</p>
								</div>
								<ArrowUpRight
									className="absolute right-[27px] bottom-8 max-[800px]:right-[15px] max-[800px]:bottom-[70px] max-[560px]:right-[25px] max-[560px]:bottom-[22px] max-[560px]:w-[18px]"
									size={22}
								/>
							</Link>
						</Card>
					);
				})}
			</div>
		</section>
	);
}
