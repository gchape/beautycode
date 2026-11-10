import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { coverImage, type PublicProduct } from "../../data/catalog.ts";
import { productImageProps } from "../../lib/product-images.ts";
import {
	comparisonValue,
	epilatorComparisonFields,
} from "../../lib/product-highlights.ts";
import { ProductPrice } from "../catalog/product-price.tsx";
import { Button } from "../ui/button.tsx";
import { DisclosureIndicator } from "./disclosure-indicator.tsx";

export function EpilatorComparison({
	products,
}: {
	products: PublicProduct[];
}) {
	if (products.length < 2) return null;
	return (
		<section
			id="epilator-comparison"
			className="site-container pt-6 scroll-mt-6"
			aria-label="ეპილატორების შედარება"
		>
			<details className="home-disclosure">
				<summary className="comparison-summary">
					<div>
						<h2 className="mb-1 text-xl leading-relaxed sm:text-2xl">
							რომელი ეპილატორი შეგეფერება?
						</h2>
						<p className="m-0 text-sm text-muted-foreground">
							შეადარე ფასი, რეჟიმები და კომპლექტაცია
						</p>
					</div>
					<DisclosureIndicator />
				</summary>
				<div className="mx-3 border-t border-border pb-5 sm:mx-8 sm:pb-8">
					<table className="w-full table-fixed border-collapse text-left text-sm">
						<caption className="sr-only">
							IPL ეპილატორების მახასიათებლები
						</caption>
						<thead>
							<tr>
								<th
									scope="col"
									className="w-[24%] align-bottom px-1 py-4 font-medium text-muted-foreground sm:px-3"
								>
									შედარება
								</th>
								{products.map((product) => {
									const image = coverImage(product);
									return (
										<th
											scope="col"
											key={product.id}
											className="px-2 py-4 align-top font-medium sm:px-4"
										>
											<Link
												to="/products/$slug"
												params={{ slug: product.slug }}
												className="block rounded-lg"
											>
												{image && (
													<img
														{...productImageProps(
															image,
															"(max-width: 640px) 100px, 144px",
														)}
														alt=""
														width="144"
														height="144"
														loading="lazy"
														decoding="async"
														className="mb-3 aspect-square w-full max-w-36 rounded-xl bg-muted object-contain p-2"
													/>
												)}
												<span className="block min-h-12 leading-relaxed">
													{product.name}
												</span>
												<ProductPrice
													product={product}
													className="mt-2 text-base sm:text-xl"
												/>
											</Link>
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{epilatorComparisonFields.map(({ label, pattern }) => (
								<tr
									key={label}
									className="border-t border-border even:bg-muted/40"
								>
									<th
										scope="row"
										className="break-words px-1 py-4 align-top font-medium sm:px-3"
									>
										{label}
									</th>
									{products.map((product) => (
										<td
											key={product.id}
											className="break-words whitespace-pre-line px-2 py-4 align-top leading-relaxed sm:px-4"
										>
											{comparisonValue(product, pattern) ||
												"მითითებული არ არის"}
										</td>
									))}
								</tr>
							))}
							<tr className="border-t border-border">
								<td />
								{products.map((product) => (
									<td key={product.id} className="px-2 pt-4 sm:px-4">
										<Button
											asChild
											variant="outline"
											className="w-full min-h-11 gap-1.5 rounded-lg border-border px-2 text-sm hover:bg-muted sm:gap-3 sm:px-4"
										>
											<Link
												to="/products/$slug"
												params={{ slug: product.slug }}
											>
												დეტალები
												<ArrowRight
													size={15}
													aria-hidden="true"
													className="hidden min-[360px]:block"
												/>
											</Link>
										</Button>
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
			</details>
		</section>
	);
}
