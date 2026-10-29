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
		<Card className="block border-0 bg-transparent p-0 shadow-none">
			<Link to="/products/$slug" params={{ slug: product.slug }}>
				<div className="relative grid aspect-square place-items-center overflow-hidden rounded-[9px] bg-[#f5eef0] text-[#a67f8e] [&_img]:size-full [&_img]:object-contain [&_img]:p-6">
					{image ? (
						<img src={image} alt={product.name} loading="lazy" />
					) : (
						<PackageOpen size={55} strokeWidth={1} />
					)}
					{discount > 0 && (
						<Badge className="absolute top-3 left-3 h-auto rounded-[5px] border-0 bg-secondary px-2.5 py-1.5 text-sm text-primary">
							−{discount}%
						</Badge>
					)}
				</div>
				<span className="mt-5 block text-[0.8125rem] font-medium tracking-[0.13em] max-[560px]:text-xs">
					{product.brand}
				</span>
				<h3 className="my-3 text-[1.0625rem] max-[560px]:text-base">
					{product.name}
				</h3>
				<ProductPrice className="text-[1.0625rem]" product={product} />
				{product.stock_status === "out_of_stock" && (
					<small>{stockLabels[product.stock_status]}</small>
				)}
			</Link>
			<Button
				variant="outline"
				className="mt-4.5 w-full"
				onClick={() => openChat(product)}
				disabled={product.stock_status === "out_of_stock"}
			>
				<MessageCircle size={17} /> ჩატში დამატება
			</Button>
		</Card>
	);
}
