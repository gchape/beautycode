import type { ComponentProps } from "react";
import type { PublicProduct } from "../../data/catalog.ts";
import { stockLabels } from "../../data/labels.ts";
import { ChatButton } from "../contact/chat-button.tsx";

export function ProductOrderButton({
	product,
	...props
}: Omit<
	ComponentProps<typeof ChatButton>,
	"product" | "children" | "disabled"
> & {
	product: PublicProduct;
}) {
	const unavailable = product.stock_status === "out_of_stock";
	return (
		<ChatButton {...props} product={product} disabled={unavailable}>
			{product.stock_status === "in_stock"
				? "შეკვეთა ჩატში"
				: stockLabels[product.stock_status]}
		</ChatButton>
	);
}
