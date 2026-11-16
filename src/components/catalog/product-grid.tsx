import { PackageOpen } from "lucide-react";
import { coverImage, type PublicProduct } from "../../data/catalog.ts";
import { ChatButton } from "../contact/chat-button.tsx";
import { Reveal } from "../motion/reveal.tsx";
import { Card } from "../ui/card.tsx";
import { ProductCard } from "./product-card.tsx";

export function ProductGrid({
	products,
	prioritizeFirstImage = true,
	reveal = false,
}: {
	products: PublicProduct[];
	prioritizeFirstImage?: boolean;
	reveal?: boolean;
}) {
	if (!products.length)
		return (
			<Card variant="empty">
				<PackageOpen size={36} strokeWidth={1} />
				<h2>პროდუქტები მალე დაემატება</h2>
				<p>დამატებითი ინფორმაციისთვის დაგვიკავშირდი.</p>
				<ChatButton variant="outline">დაგვიკავშირდი</ChatButton>
			</Card>
		);
	const firstImageIndex = prioritizeFirstImage
		? products.findIndex((product) => coverImage(product))
		: -1;
	return (
		<div className="product-grid grid grid-cols-3 gap-6 max-[560px]:gap-3">
			{products.map((product, index) => {
				const card = (
					<ProductCard
						key={product.id}
						product={product}
						priority={index === firstImageIndex}
					/>
				);
				return reveal ? (
					<Reveal
						key={product.id}
						className="h-full min-w-0"
						distance={10}
						delay={(index % 3) * 0.025}
					>
						{card}
					</Reveal>
				) : (
					card
				);
			})}
		</div>
	);
}
