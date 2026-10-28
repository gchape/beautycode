import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Droplet, Smile, Sparkles, Wind } from "lucide-react";
import { useCategories } from "../catalog/category-context";
import { Card } from "../ui/card";

export function CategoryShowcase() {
	const categories = useCategories();
	const icons = {
		wind: Wind,
		sparkles: Sparkles,
		droplet: Droplet,
		smile: Smile,
	};
	return (
		<section className="wrap section">
			<div className="section-heading">
				<div>
					<span className="eyebrow">მოვლა შენებურად</span>
					<h2>იპოვე შენი რჩეული</h2>
				</div>
				<span className="muted section-description">
					ყველაფერი შენი სილამაზის რიტუალისთვის
				</span>
			</div>
			<div className="category-grid">
				{categories.map((c, i) => {
					const Icon = icons[c.icon];
					return (
						<Card asChild key={c.slug}>
							<Link
								to="/categories/$slug"
								params={{ slug: c.slug }}
								className={`category-card category-${i}`}
							>
								<span className="category-number">0{i + 1}</span>
								<Icon size={75} strokeWidth={0.8} />
								<div>
									<h3>{c.name}</h3>
									<p>{c.description}</p>
								</div>
								<ArrowUpRight className="category-arrow" size={22} />
							</Link>
						</Card>
					);
				})}
			</div>
		</section>
	);
}
