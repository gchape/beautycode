import { PackageOpen } from "lucide-react";
import type { PublicProduct } from "../../data/catalog.ts";
import { ContactButton } from "../contact/contact-button.tsx";
import { Card } from "../ui/card.tsx";
import { ProductCard } from "./product-card.tsx";

export function ProductGrid({ products }: { products: PublicProduct[] }) {
	if (!products.length)
		return (
			<Card className="block rounded-lg border border-border bg-[#faf6f6] px-5.5 py-13.75 text-center shadow-none [&>svg]:mx-auto [&>svg]:mb-5 [&>svg]:text-[#a77a8a] [&_h2]:text-[1.375rem] [&_p]:text-[0.9375rem] [&_p]:text-muted-foreground max-[560px]:px-4.5 max-[560px]:py-10 max-[560px]:[&_h2]:text-[1.1875rem]">
				<PackageOpen size={36} strokeWidth={1} />
				<h2>პროდუქტები მალე დაემატება</h2>
				<p>დამატებითი ინფორმაციისთვის დაგვიკავშირდი.</p>
				<ContactButton />
			</Card>
		);
	return (
		<div className="grid grid-cols-3 gap-6 max-[800px]:grid-cols-2 max-[560px]:gap-3.75 max-[400px]:grid-cols-1">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
