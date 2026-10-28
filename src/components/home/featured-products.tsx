import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { PublicProduct } from "../../data/catalog.ts";
import { ProductGrid } from "../catalog/product-grid.tsx";

export function FeaturedProducts({ products }: { products: PublicProduct[] }) {
	return (
		<section className="wrap section">
			<div className="section-heading">
				<div>
					<span className="eyebrow">BEAUTY CODE-ის კოლექცია</span>
					<h2>შენი შემდეგი აღმოჩენა</h2>
				</div>
				<Link className="text-link" to="/products" search={{}}>
					ყველა პროდუქტი <ArrowRight size={18} />
				</Link>
			</div>
			<ProductGrid products={products} />
		</section>
	);
}
