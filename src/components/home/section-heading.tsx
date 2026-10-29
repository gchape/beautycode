import type { ReactNode } from "react";

export function SectionHeading({
	eyebrow,
	title,
	action,
}: {
	eyebrow: string;
	title: string;
	action?: ReactNode;
}) {
	return (
		<div className="mb-8 flex flex-wrap items-end justify-between gap-5">
			<div>
				<p className="home-eyebrow mb-3">{eyebrow}</p>
				<h2 className="m-0 text-2xl leading-relaxed sm:text-3xl">{title}</h2>
			</div>
			{action}
		</div>
	);
}
