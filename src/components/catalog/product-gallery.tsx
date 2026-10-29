import { PackageOpen } from "lucide-react";
import { useState } from "react";
import type { PublicProduct } from "../../data/catalog.ts";

import { productImageProps } from "../../lib/product-images.ts";

export function ProductGallery({ product }: { product: PublicProduct }) {
	const images = product.images;
	const [selected, setSelected] = useState(0);
	const current = images[selected] ?? images[0];
	return (
		<div className="min-w-0 self-start">
			<div className="relative grid aspect-square place-items-center overflow-hidden rounded-[9px] bg-[#f5eef0] text-[#a67f8e] [&_img]:size-full [&_img]:object-contain [&_img]:p-6">
				{current ? (
					<img
						{...productImageProps(
							current.url,
							"(max-width: 800px) 100vw, 600px",
						)}
						fetchPriority="high"
						alt={current.alt || product.name}
						width="800"
						height="800"
					/>
				) : (
					<PackageOpen size={90} strokeWidth={1} />
				)}
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
								{...productImageProps(image.url, "80px")}
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
