import { ChevronDown } from "lucide-react";

export function DisclosureIndicator() {
	return (
		<span className="disclosure-indicator" aria-hidden="true">
			<ChevronDown size={18} />
		</span>
	);
}
