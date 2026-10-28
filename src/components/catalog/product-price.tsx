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
			<span>{money(price)}</span>{" "}
			{price < product.price_minor && <del>{money(product.price_minor)}</del>}
		</p>
	);
}
