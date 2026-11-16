import { domMax, LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { cinematicEase } from "../../lib/motion.ts";

export function MotionProvider({ children }: { children: ReactNode }) {
	return (
		<MotionConfig
			reducedMotion="user"
			transition={{ duration: 0.35, ease: cinematicEase }}
		>
			<LazyMotion features={domMax} strict>
				{children}
			</LazyMotion>
		</MotionConfig>
	);
}
