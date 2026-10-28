import type { Dispatch, SetStateAction } from "react";
import { imageTypeNames } from "../../data/image-types.ts";
import {
	type EditableImage,
	useImageUpload,
} from "../../lib/admin/use-image-upload.ts";
import { Input } from "../ui/input.tsx";
import { ImageRow } from "./image-row.tsx";

export function ImageEditor({
	images,
	onChange,
	onBusy,
}: {
	images: EditableImage[];
	onChange: Dispatch<SetStateAction<EditableImage[]>>;
	onBusy: (busy: boolean) => void;
}) {
	const { busy, error, upload } = useImageUpload(
		images.length,
		onChange,
		onBusy,
	);
	function move(index: number, delta: number) {
		if (
			index < 0 ||
			index >= images.length ||
			index + delta < 0 ||
			index + delta >= images.length
		)
			return;
		const result = [...images];
		[result[index], result[index + delta]] = [
			result[index + delta],
			result[index],
		];
		onChange(result);
	}
	return (
		<fieldset disabled={busy} className="mt-6 border-t border-border pt-5">
			<legend>სურათები — პირველი სურათი მთავარია</legend>
			<Input
				type="file"
				accept={imageTypeNames.join(",")}
				multiple
				aria-label="სურათების ატვირთვა"
				onChange={(e) => {
					// Snapshot the selection before clearing the input for repeat uploads.
					void upload(Array.from(e.target.files ?? []));
					e.target.value = "";
				}}
			/>
			{busy && <p role="status">იტვირთება…</p>}
			{error && <p role="alert">{error}</p>}
			{images.map((image, index) => (
				<ImageRow
					key={image.key}
					image={image}
					index={index}
					last={index === images.length - 1}
					onAltChange={(alt) =>
						onChange(
							images.map((item, i) => (i === index ? { ...item, alt } : item)),
						)
					}
					onMove={(delta) => move(index, delta)}
					onRemove={() => onChange(images.filter((_, i) => i !== index))}
				/>
			))}
		</fieldset>
	);
}
