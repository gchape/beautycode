import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { hoverTransition } from "../../lib/motion.ts";

export function HoverCard({
	children,
	lift = 3,
}: {
	children: ReactNode;
	lift?: number;
}) {
	const reducedMotion = useReducedMotion();
	return (
		<m.div
			className="h-full min-w-0"
			initial={false}
			animate="rest"
			whileHover={reducedMotion ? undefined : "hover"}
			whileTap={reducedMotion ? undefined : "pressed"}
		>
			<m.div
				className="h-full"
				variants={{
					rest: { y: 0, scale: 1 },
					hover: { y: -lift, scale: 1 },
					pressed: { y: 0, scale: 0.99 },
				}}
				transition={hoverTransition}
			>
				{children}
			</m.div>
		</m.div>
	);
}
