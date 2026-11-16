import type { ReactNode } from "react";
import { Reveal } from "../motion/reveal.tsx";

export function SectionHeading({
	title,
	action,
}: {
	title: string;
	action?: ReactNode;
}) {
	return (
		<Reveal className="mb-6 flex flex-wrap items-end justify-between gap-5">
			<h2 className="m-0 max-w-[32ch]">{title}</h2>
			{action}
		</Reveal>
	);
}
