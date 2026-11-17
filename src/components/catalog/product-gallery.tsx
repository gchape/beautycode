import { PackageOpen } from "lucide-react";
import { useState } from "react";
import type { PublicProduct } from "../../data/catalog.ts";

import { productImageProps } from "../../lib/product-images.ts";
import { Button } from "../ui/button.tsx";
import { LoadingSpinner } from "../ui/loading-spinner.tsx";

const gallerySizes =
	"(max-width: 639px) calc(100vw - 80px), (max-width: 800px) calc(100vw - 96px), (max-width: 1099px) calc((100vw - 96px) / 2 - 48px), (max-width: 1319px) calc((100vw - 128px) / 2 - 48px), 548px";

export function ProductGallery({ product }: { product: PublicProduct }) {
	const { images } = product;
	const [selected, setSelected] = useState(0);
	const [shown, setShown] = useState(0);
	const [failed, setFailed] = useState(false);
	const [currentFailed, setCurrentFailed] = useState(false);
	const current = images[shown] ?? images[0];
	const pending = selected !== shown;
	const [interacted, setInteracted] = useState(false);
	return (
		<div className="product-gallery">
			<div className="relative grid aspect-square place-items-center overflow-hidden rounded-[9px] bg-[#f5eef0] text-[#a67f8e] [&_img]:size-full [&_img]:object-contain [&_img]:p-6">
				{current && !currentFailed ? (
					<img
						key={`${current.url}-${shown}`}
						className={`absolute inset-0 ${interacted ? "ui-fade-in" : ""}`}
						{...productImageProps(current.url, gallerySizes)}
						fetchPriority="high"
						onError={() => setCurrentFailed(true)}
						alt={current.alt || product.name}
						width="800"
						height="800"
					/>
				) : (
					<div className="flex flex-col items-center gap-4 p-6 text-center text-sm text-muted-foreground">
						<PackageOpen size={56} strokeWidth={1} aria-hidden="true" />
						<span>
							{currentFailed ? "სურათი ვერ ჩაიტვირთა" : "სურათი მალე დაემატება"}
						</span>
						{currentFailed && (
							<Button
								variant="outline"
								size="compact"
								onClick={() => setCurrentFailed(false)}
							>
								ხელახლა ცდა
							</Button>
						)}
					</div>
				)}
				{pending && images[selected] && (
					<img
						key={selected}
						{...productImageProps(images[selected].url, gallerySizes)}
						className="pointer-events-none absolute inset-0 opacity-0"
						alt=""
						aria-hidden="true"
						onLoad={() => {
							setShown(selected);
							setCurrentFailed(false);
						}}
						onError={() => {
							setSelected(shown);
							setFailed(true);
						}}
					/>
				)}
				{pending && (
					<span
						className="absolute right-4 bottom-4 rounded-full bg-background p-2"
						role="status"
						aria-label="სურათი იტვირთება"
					>
						<LoadingSpinner />
					</span>
				)}
			</div>
			{images.length > 1 && (
				<fieldset
					className="mt-3 flex min-w-0 gap-2 overflow-x-auto p-1 sm:mt-4 [&_button]:shrink-0 [&_button]:rounded-md [&_button]:border [&_button]:border-border [&_button]:p-1.25 [&_button[aria-pressed=true]]:border-primary [&_button[aria-pressed=true]]:ring-1 [&_button[aria-pressed=true]]:ring-primary [&_img]:size-14 sm:[&_img]:size-17.5 [&_img]:object-contain"
					aria-label="პროდუქტის სურათები"
				>
					{images.map((image, index) => (
						<button
							type="button"
							// biome-ignore lint/suspicious/noArrayIndexKey: Gallery order is fixed for this product, and duplicate URLs are valid.
							key={`${image.url}-${index}`}
							aria-label={`სურათი ${index + 1}`}
							aria-pressed={selected === index}
							onClick={() => {
								setInteracted(true);
								setFailed(false);
								setSelected(index);
							}}
						>
							<img
								{...productImageProps(image.url, "80px", "thumbnail")}
								alt=""
								width="80"
								height="80"
								loading="lazy"
							/>
						</button>
					))}
				</fieldset>
			)}
			<p
				role="status"
				className="mt-2 mb-0 min-h-6 text-sm text-muted-foreground"
			>
				{failed
					? "სურათი ვერ ჩაიტვირთა. სცადე ხელახლა."
					: images.length > 1
						? `სურათი ${shown + 1} / ${images.length}`
						: ""}
			</p>
		</div>
	);
}
