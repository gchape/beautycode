import {
	useAnimationControls,
	useInView,
	useReducedMotion,
} from "motion/react";
import * as m from "motion/react-m";
import { type ReactNode, useEffect, useRef } from "react";
import { revealTransition } from "../../lib/motion.ts";

export function Reveal({
	children,
	className,
	distance = 8,
	delay = 0,
}: {
	children: ReactNode;
	className?: string;
	distance?: number;
	delay?: number;
}) {
	const reducedMotion = useReducedMotion();
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.12 });
	const controls = useAnimationControls();
	useEffect(() => {
		if (!inView) return;
		if (reducedMotion) {
			controls.set({ y: 0 });
			return;
		}
		controls.set({ y: distance });
		void controls.start({ y: 0, transition: { ...revealTransition, delay } });
		return () => controls.stop();
	}, [inView, reducedMotion, controls, distance, delay]);
	return (
		<m.div ref={ref} className={className} initial={false} animate={controls}>
			{children}
		</m.div>
	);
}
