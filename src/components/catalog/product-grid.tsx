import { PackageOpen } from "lucide-react";
import type { PublicProduct } from "../../data/catalog.ts";
import { ContactButton } from "../contact/contact-button.tsx";
import { Card } from "../ui/card.tsx";
import { ProductCard } from "./product-card.tsx";

export function ProductGrid({ products }: { products: PublicProduct[] }) {
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
