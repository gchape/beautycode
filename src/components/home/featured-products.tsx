import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Product } from "../../data/catalog";
import { ProductGrid } from "../catalog/product-grid";

export function FeaturedProducts({ products }: { products: Product[] }) {
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
			<ProductGrid
				products={products.filter((product) => product.is_featured).slice(0, 6)}
			/>
		</section>
	);
}
