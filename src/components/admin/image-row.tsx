import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import type { ProductImage } from "../../data/catalog.ts";
import { productImageProps } from "../../lib/product-images.ts";
import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";

export function ImageRow({
	image,
	index,
	last,
	onAltChange,
	onMove,
	onRemove,
}: {
	image: ProductImage;
	index: number;
	last: boolean;
	onAltChange: (alt: string) => void;
	onMove: (delta: number) => void;
	onRemove: () => void;
}) {
	return (
		<div className="grid min-w-0 grid-cols-[44px_64px_minmax(0,1fr)_44px] items-center gap-x-2 gap-y-3 rounded-xl border border-border bg-background p-3 sm:gap-x-3">
			<img
				{...productImageProps(image.url, "64px", "thumbnail")}
				alt={image.alt || `სურათი ${index + 1}`}
				width="64"
				height="64"
				className="col-start-2 row-start-1 aspect-square w-16 rounded-lg bg-muted object-contain p-1"
			/>
			<div className="col-span-full row-start-2 min-w-0 sm:col-span-1 sm:col-start-3 sm:row-start-1">
				<span
					className={`mb-2 inline-block text-caption ${index === 0 ? "font-medium text-ring" : "text-muted-foreground"}`}
				>
					{index === 0 ? "მთავარი ფოტო" : `ფოტო ${index + 1}`}
				</span>
				<Input
					aria-label={`სურათის ${index + 1} აღწერა`}
					placeholder="ფოტოს მოკლე აღწერა"
					value={image.alt}
					onChange={(event) => onAltChange(event.target.value)}
				/>
			</div>
			<div className="col-start-1 row-start-1 flex flex-col items-center gap-1">
				<Button
					size="icon-lg"
					variant="outline"
					disabled={index === 0}
					onClick={() => onMove(-1)}
					aria-label={`სურათი ${index + 1}: წინ გადატანა`}
				>
					<ArrowUp size={17} aria-hidden="true" />
				</Button>
				<Button
					size="icon-lg"
					variant="outline"
					disabled={last}
					onClick={() => onMove(1)}
					aria-label={`სურათი ${index + 1}: უკან გადატანა`}
				>
					<ArrowDown size={17} aria-hidden="true" />
				</Button>
			</div>
			<Button
				size="icon-lg"
				variant="ghost"
				className="col-start-4 row-start-1 text-destructive hover:bg-red-50"
				onClick={onRemove}
				aria-label={`სურათი ${index + 1}: წაშლა`}
			>
				<Trash2 size={17} aria-hidden="true" />
			</Button>
		</div>
	);
}
