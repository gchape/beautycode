import { finalPrice, money, type Product } from "../../data/catalog";

export function ProductPrice({
	product,
	className,
}: {
	product: Product;
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
