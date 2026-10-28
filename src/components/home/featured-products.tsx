import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { PublicProduct } from "../../data/catalog.ts";
import { ProductGrid } from "../catalog/product-grid.tsx";

export function FeaturedProducts({ products }: { products: PublicProduct[] }) {
	return (
		<section className="mx-auto w-[min(1240px,calc(100%-80px))] max-[1100px]:w-[calc(100%-48px)] max-[560px]:w-[calc(100%-32px)] pt-[66px] max-[560px]:pt-[42px]">
			<div className="mb-[27px] flex items-end justify-between gap-5 [&_h2]:mt-3 [&_h2]:mb-0 [&_h2]:text-[1.8125rem] max-[560px]:items-start max-[560px]:[&_h2]:text-2xl">
				<div>
					<span className="block text-[0.8125rem] font-medium tracking-[0.13em] max-[560px]:text-xs">
						BEAUTY CODE-ის კოლექცია
					</span>
					<h2>შენი შემდეგი აღმოჩენა</h2>
				</div>
				<Link
					className="flex items-center gap-[13px] text-[0.9375rem] hover:text-[#975c70] max-[560px]:max-w-[125px] max-[560px]:gap-[5px] max-[560px]:text-[0.8125rem] max-[560px]:leading-[1.8]"
					to="/products"
					search={{}}
				>
					ყველა პროდუქტი <ArrowRight size={18} />
				</Link>
			</div>
			<ProductGrid products={products} />
		</section>
	);
}
