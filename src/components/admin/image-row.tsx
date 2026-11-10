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
		<div className="grid min-w-0 grid-cols-[64px_minmax(0,1fr)] items-center gap-3 rounded-xl border border-border p-3 sm:grid-cols-[64px_minmax(0,1fr)_auto]">
			<img
				{...productImageProps(image.url, "64px", "thumbnail")}
				alt={image.alt || `სურათი ${index + 1}`}
				width="64"
				height="64"
				className="aspect-square w-16 rounded-lg bg-muted object-contain p-1"
			/>
			<div className="min-w-0">
				<span
					className={`mb-2 inline-block text-[0.8125rem] ${index === 0 ? "font-medium text-ring" : "text-muted-foreground"}`}
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
			<div className="col-span-full flex items-center justify-end gap-2 sm:col-span-1">
				<Button
					size="icon"
					variant="outline"
					className="size-11"
					disabled={index === 0}
					onClick={() => onMove(-1)}
					aria-label={`სურათი ${index + 1}: წინ გადატანა`}
				>
					<ArrowUp size={17} />
				</Button>
				<Button
					size="icon"
					variant="outline"
					className="size-11"
					disabled={last}
					onClick={() => onMove(1)}
					aria-label={`სურათი ${index + 1}: უკან გადატანა`}
				>
					<ArrowDown size={17} />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					className="size-11 text-destructive hover:bg-red-50"
					onClick={onRemove}
					aria-label={`სურათი ${index + 1}: წაშლა`}
				>
					<Trash2 size={17} />
				</Button>
			</div>
		</div>
	);
}
