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
		<section className="mx-auto w-[min(1240px,calc(100%-80px))] max-[1100px]:w-[calc(100%-48px)] max-[560px]:w-[calc(100%-32px)] pt-16.5 max-[560px]:pt-10.5">
			<div className="mb-6.75 flex items-end justify-between gap-5 [&_h2]:mt-3 [&_h2]:mb-0 [&_h2]:text-[1.8125rem] max-[560px]:items-start max-[560px]:[&_h2]:text-2xl">
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
			<div className="grid grid-cols-4 gap-5.5 max-[1100px]:grid-cols-2 max-[800px]:gap-3 max-[560px]:grid-cols-1 max-[560px]:gap-3.5">
				{categories.map((c, i) => {
					const Icon = categoryIcons[c.icon];
					return (
						<Card
							asChild
							key={c.slug}
							className={`group grid min-w-0 grid-cols-[minmax(0,1fr)_auto] grid-rows-[auto_1fr_auto] items-start gap-x-4 gap-y-5 rounded-lg border-0 p-6 shadow-none transition-shadow hover:shadow-md max-[800px]:p-5 ${categoryColors[i % categoryColors.length]}`}
						>
							<Link to="/categories/$slug" params={{ slug: c.slug }}>
								<span className="self-center font-[Georgia,serif] text-[0.9375rem] text-[#987783]">
									{String(i + 1).padStart(2, "0")}
								</span>
								<Icon
									className="size-16 text-[#84616a] max-[560px]:size-12"
									size={75}
									strokeWidth={0.8}
								/>
								<div className="col-span-2 min-w-0">
									<h3 className="mb-2 text-xl leading-relaxed wrap-anywhere max-[800px]:text-lg">
										{c.name}
									</h3>
									<p className="m-0 text-[0.8125rem] text-[#79656a]">
										{c.description}
									</p>
								</div>
								<ArrowUpRight
									className="col-start-2 self-end justify-self-end"
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
