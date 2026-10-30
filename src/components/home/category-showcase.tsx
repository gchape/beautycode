import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useCategories } from "../catalog/category-context.tsx";
import { categoryIcons } from "../category-icons.ts";
import { SectionHeading } from "./section-heading.tsx";

export function CategoryShowcase() {
	const categories = useCategories();
	if (!categories.length) return null;
	return (
		<section className="site-container home-section">
			<SectionHeading title="შეარჩიე კატეგორიით" />
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{categories.map((category) => {
					const Icon = categoryIcons[category.icon];
					return (
						<Link
							key={category.slug}
							to="/categories/$slug"
							params={{ slug: category.slug }}
							className="group flex flex-col rounded-xl border border-border p-6 transition-colors hover:bg-muted"
						>
							<div className="mb-5 flex items-center justify-between">
								<Icon size={30} strokeWidth={1} aria-hidden="true" />
								<ArrowUpRight size={20} aria-hidden="true" />
							</div>
							<h3 className="mb-2 text-lg">{category.name}</h3>
							<p className="mb-0 flex-1 text-sm text-muted-foreground">
								{category.description}
							</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
