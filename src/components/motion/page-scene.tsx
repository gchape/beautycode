import { useLocation } from "@tanstack/react-router";
import { useAnimate, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";
import { cinematicEase } from "../../lib/motion.ts";

export function PageScene({ children }: { children: ReactNode }) {
	const pathname = useLocation({ select: (location) => location.pathname });
	const previousPath = useRef(pathname);
	const [scope, animate] = useAnimate<HTMLElement>();
	const reducedMotion = useReducedMotion();

	useEffect(() => {
		if (previousPath.current === pathname) return;
		previousPath.current = pathname;
		if (reducedMotion || pathname.startsWith("/admin")) return;

		// Animate the committed route in place, preserving router context and form state.
		const element = scope.current;
		const animation = animate(
			element,
			{
				opacity: [0.92, 1],
			},
			{ duration: 0.2, ease: cinematicEase },
		);
		return () => {
			animation.cancel();
			element.style.removeProperty("opacity");
		};
	}, [pathname, reducedMotion, scope, animate]);

	return (
		<main id="main" ref={scope}>
			{children}
		</main>
	);
}
