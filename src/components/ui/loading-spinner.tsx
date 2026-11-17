import { LoaderCircle } from "lucide-react";

export function LoadingSpinner({ size = 18 }: { size?: number }) {
	return (
		<span className="inline-flex shrink-0 ui-spinner" aria-hidden="true">
			<LoaderCircle size={size} />
		</span>
	);
}
