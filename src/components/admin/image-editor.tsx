import { useState } from "react";
import type { ProductImage } from "../../data/catalog";
import { uploadImage } from "../../lib/admin/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function ImageEditor({
	images,
	onChange,
	onBusy,
}: {
	images: ProductImage[];
	onChange: (images: ProductImage[]) => void;
	onBusy: (busy: boolean) => void;
}) {
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	async function upload(files: FileList | null) {
		if (!files?.length) return;
		if (images.length + files.length > 12) {
			setError("მაქსიმუმ 12 სურათი");
			return;
		}
		setBusy(true);
		onBusy(true);
		setError("");
		const added: ProductImage[] = [];
		try {
			for (const file of files)
				added.push({ url: await uploadImage(file), alt: "" });
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "ატვირთვა ვერ შესრულდა",
			);
		} finally {
			onChange([...images, ...added]);
			setBusy(false);
			onBusy(false);
		}
	}
	function move(index: number, delta: number) {
		const result = [...images];
		[result[index], result[index + delta]] = [
			result[index + delta],
			result[index],
		];
		onChange(result);
	}
	return (
		<fieldset disabled={busy} className="admin-images">
			<legend>სურათები — პირველი სურათი მთავარია</legend>
			<Input
				type="file"
				accept="image/png,image/jpeg,image/webp"
				multiple
				aria-label="სურათების ატვირთვა"
				onChange={(e) => {
					void upload(e.target.files);
					e.target.value = "";
				}}
			/>
			{busy && <p role="status">იტვირთება…</p>}
			{error && <p role="alert">{error}</p>}
			{images.map((image, index) => (
				<div className="admin-image" key={image.url}>
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
						onChange={(e) =>
							onChange(
								images.map((item, i) =>
									i === index ? { ...item, alt: e.target.value } : item,
								),
							)
						}
					/>
					<Button
						type="button"
						variant="outline"
						disabled={index === 0}
						onClick={() => move(index, -1)}
						aria-label="წინ გადატანა"
					>
						↑
					</Button>
					<Button
						type="button"
						variant="outline"
						disabled={index === images.length - 1}
						onClick={() => move(index, 1)}
						aria-label="უკან გადატანა"
					>
						↓
					</Button>
					<Button
						type="button"
						variant="ghost"
						onClick={() => onChange(images.filter((_, i) => i !== index))}
					>
						წაშლა
					</Button>
				</div>
			))}
		</fieldset>
	);
}
