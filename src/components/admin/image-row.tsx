import type { ProductImage } from "../../data/catalog.ts";
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
		<div className="my-3.75 flex items-center gap-2.5 [&_img]:size-20 [&_img]:shrink-0 [&_img]:object-contain max-[600px]:flex-wrap max-[600px]:[&_input]:min-w-40 max-[600px]:[&_input]:flex-1">
			<img
				src={image.url}
				alt={image.alt || `სურათი ${index + 1}`}
				width="80"
				height="80"
			/>
			<Input
				aria-label={`სურათის ${index + 1} აღწერა`}
				placeholder="სურათის აღწერა"
				value={image.alt}
				onChange={(e) => onAltChange(e.target.value)}
			/>
			<Button
				type="button"
				variant="outline"
				disabled={index === 0}
				onClick={() => onMove(-1)}
				aria-label="წინ გადატანა"
			>
				↑
			</Button>
			<Button
				type="button"
				variant="outline"
				disabled={last}
				onClick={() => onMove(1)}
				aria-label="უკან გადატანა"
			>
				↓
			</Button>
			<Button type="button" variant="ghost" onClick={onRemove}>
				წაშლა
			</Button>
		</div>
	);
}
