import { Link } from "@tanstack/react-router";
import { MessageCircle, PackageOpen } from "lucide-react";
import type { PublicProduct } from "../../data/catalog.ts";
import { coverImage, discountPercent } from "../../data/catalog.ts";
import { stockLabels } from "../../data/labels.ts";
import { useOpenChat } from "../contact/contact-context.tsx";
import { Badge } from "../ui/badge.tsx";
import { Button } from "../ui/button.tsx";
import { Card } from "../ui/card.tsx";
import { ProductPrice } from "./product-price.tsx";

export function ProductCard({ product }: { product: PublicProduct }) {
	const openChat = useOpenChat();
	const image = coverImage(product);
	const discount = discountPercent(product);
	return (
		<Card className="product-card">
			<Link to="/products/$slug" params={{ slug: product.slug }}>
				<div className="product-image">
					{image ? (
						<img src={image} alt={product.name} loading="lazy" />
					) : (
						<PackageOpen size={55} strokeWidth={1} />
					)}
					{discount > 0 && <Badge className="badge">−{discount}%</Badge>}
				</div>
				<span className="eyebrow">{product.brand}</span>
				<h3>{product.name}</h3>
				<ProductPrice product={product} />
				{product.stock_status === "out_of_stock" && (
					<small>{stockLabels[product.stock_status]}</small>
				)}
			</Link>
			<Button
				variant="outline"
				className="product-chat-button"
				onClick={() => openChat(product)}
				disabled={product.stock_status === "out_of_stock"}
			>
				<MessageCircle size={17} /> ჩატში დამატება
			</Button>
		</Card>
	);
}
