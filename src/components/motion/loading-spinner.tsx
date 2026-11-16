import { LoaderCircle } from "lucide-react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

export function LoadingSpinner({ size = 18 }: { size?: number }) {
	const reducedMotion = useReducedMotion();
	return (
		<m.span
			className="inline-flex shrink-0"
			animate={{ rotate: reducedMotion ? 0 : 360 }}
			transition={
				reducedMotion
					? { duration: 0 }
					: { duration: 0.8, repeat: Infinity, ease: "linear" }
			}
			aria-hidden="true"
		>
			<LoaderCircle size={size} />
		</m.span>
	);
}
