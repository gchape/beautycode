import { PackageOpen } from "lucide-react";
import { useState } from "react";
import type { Product } from "../../data/catalog";

export function ProductGallery({ product }: { product: Product }) {
	const images = product.images?.length
		? product.images
		: product.image_url
			? [{ url: product.image_url, alt: product.name }]
			: [];
	const [selected, setSelected] = useState(0);
	const current = images[selected] ?? images[0];
	return (
		<div className="product-gallery">
			<div className="product-image">
				{current ? (
					<img
						src={current.url}
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
					className="gallery-thumbnails"
					aria-label="პროდუქტის სურათები"
				>
					{images.map((image, index) => (
						<button
							type="button"
							key={image.url}
							aria-label={`სურათი ${index + 1}`}
							aria-pressed={selected === index}
							onClick={() => setSelected(index)}
						>
							<img
								src={image.url}
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
