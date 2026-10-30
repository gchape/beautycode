import { finalPrice, money, type PublicProduct } from "../../data/catalog.ts";

export function ProductPrice({
	product,
	className,
}: {
	product: PublicProduct;
	className?: string;
}) {
	const price = finalPrice(product);
	return (
		<p className={className}>
			<span className="font-semibold tabular-nums text-foreground">
				{money(price)}
			</span>{" "}
			{price < product.price_minor && (
				<del className="ml-3 text-base font-medium tabular-nums text-ring decoration-1">
					{money(product.price_minor)}
				</del>
			)}
		</p>
	);
}
