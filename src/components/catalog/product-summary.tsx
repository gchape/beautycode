import { Link } from "@tanstack/react-router";
import { Banknote, Check, ShieldCheck, Truck } from "lucide-react";
import type { PublicProduct } from "../../data/catalog.ts";
import { stockLabels } from "../../data/labels.ts";
import {
	productHighlights,
	productWarranty,
} from "../../lib/product-highlights.ts";
import { ProductOrderButton } from "./product-order-button.tsx";
import { ProductPrice } from "./product-price.tsx";

export function ProductSummary({ product }: { product: PublicProduct }) {
	const highlights = productHighlights(product);
	const warranty = productWarranty(product);
	return (
		<div className="product-summary min-w-0">
			<span className="block text-sm font-medium tracking-wide text-muted-foreground">
				{product.brand}
			</span>
			<h1 className="heading-title">{product.name}</h1>
			<p className="mb-3 text-sm font-medium">
				{stockLabels[product.stock_status]}
			</p>
			<ProductPrice product={product} className="mb-5 text-price" />
			{highlights.length > 0 && (
				<ul className="mb-6 space-y-2 text-body leading-relaxed">
					{highlights.map((feature) => (
						<li key={feature} className="flex items-start gap-3">
							<Check
								className="mt-1 shrink-0 text-ring"
								size={17}
								aria-hidden="true"
							/>
							<span>{feature}</span>
						</li>
					))}
				</ul>
			)}
			<ProductOrderButton product={product} className="w-full min-h-13" />
			<p className="mt-3 text-sm text-muted-foreground">
				შეკვეთის დეტალებს ჩატში შევათანხმებთ.
			</p>
			<div className="my-6 grid gap-4 rounded-xl border border-border bg-muted/50 p-4 text-sm leading-relaxed">
				<Link
					to="/delivery"
					className="flex items-start gap-3 rounded-md hover:underline"
				>
					<Truck size={19} className="mt-0.5 shrink-0" aria-hidden="true" />
					<span>უფასო მიწოდება მთელ საქართველოში</span>
				</Link>
				<div className="flex items-start gap-3">
					<Banknote size={19} className="mt-0.5 shrink-0" aria-hidden="true" />
					<span>გადარიცხვა ან კურიერთან ნაღდი ანგარიშსწორება</span>
				</div>
				{warranty && (
					<Link
						to="/returns"
						className="flex items-start gap-3 rounded-md hover:underline"
					>
						<ShieldCheck
							size={19}
							className="mt-0.5 shrink-0"
							aria-hidden="true"
						/>
						<span>{warranty}</span>
					</Link>
				)}
			</div>
		</div>
	);
}
