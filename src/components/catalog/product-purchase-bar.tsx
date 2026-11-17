import type { PublicProduct } from "../../data/catalog.ts";
import { ProductOrderButton } from "./product-order-button.tsx";
import { ProductPrice } from "./product-price.tsx";
export function ProductPurchaseBar({ product }: { product: PublicProduct }) {
	return (
		<div className="product-purchase-bar">
			<div className="flex items-center justify-between gap-3">
				<ProductPrice product={product} className="m-0 text-subheading" />
				<ProductOrderButton
					product={product}
					className="min-h-11 gap-2 px-4 text-sm"
				/>
			</div>
		</div>
	);
}
