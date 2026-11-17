import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { coverImage, type PublicProduct } from "../../data/catalog.ts";
import { productImageProps } from "../../lib/product-images.ts";
import { ProductPrice } from "../catalog/product-price.tsx";
import { ChatButton } from "../contact/chat-button.tsx";
import { Button } from "../ui/button.tsx";

export function HomeHero({ products }: { products: PublicProduct[] }) {
	const highlights = products
		.filter(
			(product) =>
				product.category_slug === "ეპილატორები" && coverImage(product),
		)
		.slice(0, 2);
	return (
		<section
			className={`site-container home-hero max-sm:mt-4 ${highlights.length ? "home-hero-with-products" : ""}`}
			aria-labelledby="hero-title"
		>
			<div className="hero-copy home-entrance flex flex-col items-start justify-center px-5 py-7 text-left sm:px-10 sm:py-12">
				<span className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
					<Sparkles size={15} aria-hidden="true" /> სილამაზე იწყება შენით
				</span>
				<h1
					id="hero-title"
					className="heading-display mb-4 max-w-[15ch] sm:mb-5"
				>
					შენი მოვლა, <br className="sm:hidden" />
					<span className="text-[#865064]">შენს რიტმში.</span>
				</h1>
				<p className="mb-5 max-w-[44ch] text-body sm:mb-7 leading-relaxed text-muted-foreground">
					სახის, სხეულისა და თმის მოვლის მოწყობილობები. შეარჩიე ის, რაც შენს
					ყოველდღიურობას უფრო მარტივს გახდის.
				</p>
				<div className="flex w-full flex-col items-center justify-start gap-3 xl:w-auto xl:flex-row xl:gap-5">
					<div className="w-full xl:w-auto">
						<Button asChild size="lg" className="w-full">
							<Link to="/products" search={{}} className="action-link">
								ყველა პროდუქტი{" "}
								<span aria-hidden="true">
									<ArrowRight className="action-arrow" size={18} />
								</span>
							</Link>
						</Button>
					</div>
					<ChatButton variant="ghost" className="w-full px-2 text-sm xl:w-auto">
						დაგეხმარებით არჩევანში
					</ChatButton>
				</div>
			</div>
			{highlights.length > 0 && (
				<div className="hero-products">
					<span
						className="hero-orbit"
						style={{ transform: "rotate(-25deg)" }}
						aria-hidden="true"
					/>
					{highlights.map((product, index) => {
						const image = coverImage(product);
						if (!image) return null;
						return (
							<div
								key={product.id}
								className={`hero-product-scene hero-product-scene-${index + 1}`}
							>
								<Link
									key={product.id}
									to="/products/$slug"
									params={{ slug: product.slug }}
									className={`action-link hero-product hero-product-${index + 1}`}
								>
									<img
										{...productImageProps(
											image,
											"(max-width: 560px) 40vw, (max-width: 1000px) 220px, 240px",
										)}
										alt={product.images[0].alt || product.name}
										width="300"
										height="300"
										loading={index === 0 ? "eager" : "lazy"}
										fetchPriority={index === 0 ? "high" : undefined}
										decoding="async"
									/>
									<div className="hero-product-caption">
										<span>{product.name}</span>
										<ProductPrice
											product={product}
											className="text-subheading"
										/>
										<span className="shrink-0" aria-hidden="true">
											<ArrowRight className="action-arrow" size={16} />
										</span>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			)}
		</section>
	);
}
