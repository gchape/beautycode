import { Link } from "@tanstack/react-router";
import { MessageCircle, PackageOpen } from "lucide-react";
import type { PublicProduct } from "../../data/catalog.ts";
import { coverImage, discountPercent } from "../../data/catalog.ts";
import { stockLabels } from "../../data/labels.ts";
import { productImageProps } from "../../lib/product-images.ts";
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
		<Card className="group flex h-full min-w-0 flex-col gap-0 wrap-anywhere border-0 bg-transparent p-0 shadow-none">
			<Link
				className="flex flex-1 flex-col rounded-lg"
				to="/products/$slug"
				params={{ slug: product.slug }}
			>
				<div className="relative grid aspect-square place-items-center overflow-hidden rounded-xl bg-[#f5eef0] text-[#a67f8e] [&_img]:size-full [&_img]:object-contain [&_img]:p-4 sm:[&_img]:p-6">
					{image ? (
						<img
							className="transition-transform duration-300 motion-safe:group-hover:scale-105 motion-reduce:transition-none"
							{...productImageProps(
								image,
								"(max-width: 400px) 100vw, (max-width: 800px) 50vw, 400px",
							)}
							alt={product.name}
							width="400"
							height="400"
							loading="lazy"
							decoding="async"
						/>
					) : (
						<PackageOpen size={55} strokeWidth={1} />
					)}
					{discount > 0 && (
						<Badge className="absolute top-3 left-3 h-auto rounded-[5px] border-0 bg-secondary px-2.5 py-1.5 text-sm text-primary">
							−{discount}%
						</Badge>
					)}
				</div>
				<h3 className="mt-4 mb-3 text-base leading-relaxed max-[560px]:text-sm">
					{product.name}
				</h3>
				<ProductPrice className="mt-auto text-[1.0625rem]" product={product} />
				{product.stock_status === "out_of_stock" && (
					<small>{stockLabels[product.stock_status]}</small>
				)}
			</Link>
			<Button
				variant="outline"
				className="mt-4 w-full gap-2 px-3 max-[560px]:text-xs"
				onClick={() => openChat(product)}
				disabled={product.stock_status === "out_of_stock"}
			>
				<MessageCircle size={17} /> შეკვეთა ჩატში
			</Button>
		</Card>
	);
}
