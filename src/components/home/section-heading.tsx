import type { ReactNode } from "react";

export function SectionHeading({
	title,
	action,
}: {
	title: string;
	action?: ReactNode;
}) {
	return (
		<div className="mb-8 flex flex-wrap items-end justify-between gap-5">
			<div>
				<h2 className="m-0 text-2xl leading-relaxed sm:text-3xl">{title}</h2>
			</div>
			{action}
		</div>
	);
}
