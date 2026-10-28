import { PackageOpen } from "lucide-react";
import type { Product } from "../../data/catalog";
import { ContactButton } from "../contact/contact-button";
import { Card } from "../ui/card";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: Product[] }) {
	if (!products.length)
		return (
			<Card className="empty-state">
				<PackageOpen size={36} strokeWidth={1} />
				<h2>პროდუქტები მალე დაემატება</h2>
				<p>დამატებითი ინფორმაციისთვის დაგვიკავშირდი.</p>
				<ContactButton />
			</Card>
		);
	return (
		<div className="product-grid">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
