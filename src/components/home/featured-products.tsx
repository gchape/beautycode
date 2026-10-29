import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { PublicProduct } from "../../data/catalog.ts";
import { ProductGrid } from "../catalog/product-grid.tsx";
import { SectionHeading } from "./section-heading.tsx";

export function FeaturedProducts({ products }: { products: PublicProduct[] }) {
	return (
		<section
			id="featured-products"
			className="site-container home-section scroll-mt-8"
		>
			<SectionHeading
				eyebrow="BEAUTY CODE-ის კოლექცია"
				title="შერჩეული შენი ყოველდღიურობისთვის"
				action={
					<Link
						className="inline-flex min-h-11 items-center gap-3 border-b border-current text-sm"
						to="/products"
						search={{}}
					>
						ყველა პროდუქტი <ArrowRight size={17} />
					</Link>
				}
			/>
			<ProductGrid products={products} />
		</section>
	);
}
