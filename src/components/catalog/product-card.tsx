import { Link } from "@tanstack/react-router";
import { MessageCircle, PackageOpen } from "lucide-react";
import type { Product } from "../../data/catalog";
import { useContact } from "../contact/contact-context";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ProductPrice } from "./product-price";

export function ProductCard({ product }: { product: Product }) {
	const contact = useContact();
	return (
		<Card className="product-card">
			<Link to="/products/$slug" params={{ slug: product.slug }}>
				<div className="product-image">
					{product.image_url ? (
						<img src={product.image_url} alt={product.name} loading="lazy" />
					) : (
						<PackageOpen size={55} strokeWidth={1} />
					)}
					{product.discount_percent > 0 && (
						<Badge className="badge">−{product.discount_percent}%</Badge>
					)}
				</div>
				<span className="eyebrow">{product.brand}</span>
				<h3>{product.name}</h3>
				<ProductPrice product={product} />
				{product.stock_status === "out_of_stock" && (
					<small>არ არის მარაგში</small>
				)}
			</Link>
			<Button
				variant="outline"
				className="product-chat-button"
				onClick={() => contact(product)}
				disabled={product.stock_status === "out_of_stock"}
			>
				<MessageCircle size={17} /> ჩატში დამატება
			</Button>
		</Card>
	);
}
