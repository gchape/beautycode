import { Button } from "../ui/button.tsx";

export function FormActions({
	onCancel,
	pending,
	uploading = false,
	canSubmit = true,
}: {
	onCancel: () => void;
	pending: boolean;
	uploading?: boolean;
	canSubmit?: boolean;
}) {
	const busy = pending || uploading;
	return (
		<div className="sticky bottom-0 z-10 mt-6 flex flex-wrap justify-end gap-3 border-t border-border bg-background py-4">
			<Button
				variant="outline"
				className="min-h-11 flex-1 px-4 sm:flex-none"
				disabled={busy}
				onClick={onCancel}
			>
				გაუქმება
			</Button>
			<Button
				type="submit"
				className="min-h-11 flex-1 gap-2 px-4 sm:flex-none"
				disabled={busy || !canSubmit}
			>
				{pending ? "ინახება…" : uploading ? "იტვირთება…" : "შენახვა"}
			</Button>
		</div>
	);
}
