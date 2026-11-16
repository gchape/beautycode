import { PackageOpen } from "lucide-react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useState } from "react";
import type { PublicProduct } from "../../data/catalog.ts";

import { productImageProps } from "../../lib/product-images.ts";

export function ProductGallery({ product }: { product: PublicProduct }) {
	const { images } = product;
	const [selected, setSelected] = useState(0);
	const current = images[selected] ?? images[0];
	const reducedMotion = useReducedMotion();
	return (
		<div className="min-w-0 self-start">
			<div className="relative grid aspect-square place-items-center overflow-hidden rounded-[9px] bg-[#f5eef0] text-[#a67f8e] [&_img]:size-full [&_img]:object-contain [&_img]:p-6">
				<AnimatePresence initial={false}>
					{current ? (
						<m.img
							key={`${current.url}-${selected}`}
							className="absolute inset-0"
							initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.025 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{
								opacity: 0,
								transition: { duration: reducedMotion ? 0 : 0.12 },
							}}
							transition={{ duration: reducedMotion ? 0 : 0.3 }}
							{...productImageProps(
								current.url,
								"(max-width: 639px) calc(100vw - 80px), (max-width: 800px) calc(100vw - 96px), (max-width: 1099px) calc((100vw - 96px) / 2 - 48px), (max-width: 1319px) calc((100vw - 128px) / 2 - 48px), 548px",
							)}
							fetchPriority="high"
							alt={current.alt || product.name}
							width="800"
							height="800"
						/>
					) : (
						<PackageOpen size={90} strokeWidth={1} />
					)}
				</AnimatePresence>
			</div>
			{images.length > 1 && (
				<fieldset
					className="mt-4 flex flex-wrap gap-2.5 [&_button]:rounded-md [&_button]:border [&_button]:border-border [&_button]:p-1.25 [&_button[aria-pressed=true]]:border-primary [&_img]:size-17.5 [&_img]:object-contain"
					aria-label="პროდუქტის სურათები"
				>
					{images.map((image, index) => (
						<button
							type="button"
							// biome-ignore lint/suspicious/noArrayIndexKey: Gallery order is fixed for this product, and duplicate URLs are valid.
							key={`${image.url}-${index}`}
							aria-label={`სურათი ${index + 1}`}
							aria-pressed={selected === index}
							onClick={() => setSelected(index)}
						>
							<img
								{...productImageProps(image.url, "80px", "thumbnail")}
								alt={image.alt || product.name}
								width="80"
								height="80"
								loading="lazy"
							/>
						</button>
					))}
				</fieldset>
			)}
		</div>
	);
}
