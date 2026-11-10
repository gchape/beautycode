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
		<p
			className={`flex flex-wrap items-baseline gap-x-2 gap-y-0 ${className ?? ""}`}
		>
			<span className="sr-only">
				{price < product.price_minor ? "ფასი ფასდაკლებით:" : "ფასი:"}
			</span>
			<span className="font-semibold tabular-nums text-foreground">
				{money(price)}
			</span>{" "}
			{price < product.price_minor && (
				<del className="text-[0.8em] font-normal tabular-nums text-muted-foreground decoration-1">
					{money(product.price_minor)}
				</del>
			)}
		</p>
	);
}
