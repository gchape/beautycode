import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import * as m from "motion/react-m";
import { useCategories } from "../catalog/category-context.tsx";
import { categoryIcons } from "../category-icons.ts";
import { HoverCard } from "../motion/hover-card.tsx";
import { Reveal } from "../motion/reveal.tsx";
import { SectionHeading } from "./section-heading.tsx";

export function CategoryShowcase() {
	const categories = useCategories();
	if (!categories.length) return null;
	return (
		<section className="site-container home-section">
			<SectionHeading title="შეარჩიე კატეგორიით" />
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{categories.map((category, index) => {
					const Icon = categoryIcons[category.icon];
					return (
						<Reveal
							key={category.slug}
							className="h-full"
							distance={8}
							delay={Math.min(index, 3) * 0.02}
						>
							<HoverCard>
								<Link
									to="/categories/$slug"
									params={{ slug: category.slug }}
									className="group flex h-full flex-col rounded-xl border border-border p-5 hover:bg-muted sm:p-6"
								>
									<div className="mb-5 flex items-center justify-between">
										<Icon size={30} strokeWidth={1} aria-hidden="true" />
										<m.span
											variants={{
												rest: { x: 0, y: 0 },
												hover: { x: 2, y: -2 },
												pressed: { x: 0, y: 0 },
											}}
											transition={{ duration: 0.18 }}
											aria-hidden="true"
										>
											<ArrowUpRight size={20} />
										</m.span>
									</div>
									<h3 className="mb-2 text-lg">{category.name}</h3>
									<p className="mb-0 flex-1 text-sm text-muted-foreground">
										{category.description}
									</p>
								</Link>
							</HoverCard>
						</Reveal>
					);
				})}
			</div>
		</section>
	);
}
