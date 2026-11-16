import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAnimationControls, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useEffect } from "react";
import { coverImage, type PublicProduct } from "../../data/catalog.ts";
import { cinematicEase } from "../../lib/motion.ts";
import { productImageProps } from "../../lib/product-images.ts";
import { ProductPrice } from "../catalog/product-price.tsx";
import { ChatButton } from "../contact/chat-button.tsx";
import { HoverCard } from "../motion/hover-card.tsx";
import { Button } from "../ui/button.tsx";

export function HomeHero({ products }: { products: PublicProduct[] }) {
	const reducedMotion = useReducedMotion();
	const controls = useAnimationControls();
	useEffect(() => {
		if (reducedMotion) {
			controls.set("visible");
			return;
		}
		controls.set("offset");
		void controls.start("visible");
		return () => controls.stop();
	}, [controls, reducedMotion]);
	const entrance = (distance: number) => ({
		offset: { y: distance },
		visible: { y: 0 },
	});
	const highlights = products
		.filter(
			(product) =>
				product.category_slug === "ეპილატორები" && coverImage(product),
		)
		.slice(0, 2);
	return (
		<m.section
			initial={false}
			animate={controls}
			className={`site-container home-hero max-sm:mt-4 ${highlights.length ? "home-hero-with-products" : ""}`}
			aria-labelledby="hero-title"
		>
			<m.div
				initial={false}
				variants={entrance(10)}
				transition={{ duration: 0.32, ease: cinematicEase }}
				className="hero-copy flex flex-col items-start justify-center px-5 py-7 text-left sm:px-10 sm:py-12"
			>
				<span className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
					<Sparkles size={15} aria-hidden="true" /> სილამაზე იწყება შენით
				</span>
				<h1
					id="hero-title"
					className="mb-4 max-w-3xl text-[clamp(1.75rem,5.5vw,3.25rem)] leading-[1.4] text-balance"
				>
					შენი მოვლა, <br className="sm:hidden" />
					<span className="text-[#865064]">შენს რიტმში.</span>
				</h1>
				<p className="mb-6 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base text-muted-foreground">
					სახის, სხეულისა და თმის მოვლის მოწყობილობები. შეარჩიე ის, რაც შენს
					ყოველდღიურობას უფრო მარტივს გახდის.
				</p>
				<div className="flex w-full flex-col items-center justify-start gap-3 xl:w-auto xl:flex-row xl:gap-5">
					<m.div
						className="w-full xl:w-auto"
						initial={false}
						animate="rest"
						whileHover="hover"
						whileTap="pressed"
					>
						<Button asChild size="lg" className="w-full">
							<Link to="/products" search={{}}>
								ყველა პროდუქტი{" "}
								<m.span
									variants={{
										rest: { x: 0 },
										hover: { x: 4 },
										pressed: { x: 0 },
									}}
									transition={{ duration: 0.18 }}
									aria-hidden="true"
								>
									<ArrowRight size={18} />
								</m.span>
							</Link>
						</Button>
					</m.div>
					<ChatButton variant="ghost" className="w-full px-2 text-sm xl:w-auto">
						დაგეხმარებით არჩევანში
					</ChatButton>
				</div>
			</m.div>
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
							<m.div
								key={product.id}
								className={`hero-product-scene hero-product-scene-${index + 1}`}
								initial={false}
								variants={entrance(14)}
								transition={{
									duration: 0.36,
									delay: index * 0.025,
									ease: cinematicEase,
								}}
							>
								<HoverCard lift={4}>
									<Link
										key={product.id}
										to="/products/$slug"
										params={{ slug: product.slug }}
										className={`hero-product hero-product-${index + 1}`}
									>
										<m.img
											initial={false}
											variants={{
												rest: { scale: 1 },
												hover: { scale: 1.025 },
												pressed: { scale: 1 },
											}}
											transition={{ duration: 0.22, ease: cinematicEase }}
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
											<ProductPrice product={product} className="text-base" />
											<m.span
												className="shrink-0"
												variants={{
													rest: { x: 0 },
													hover: { x: 3 },
													pressed: { x: 0 },
												}}
												transition={{ duration: 0.18 }}
												aria-hidden="true"
											>
												<ArrowRight size={16} />
											</m.span>
										</div>
									</Link>
								</HoverCard>
							</m.div>
						);
					})}
				</div>
			)}
		</m.section>
	);
}
