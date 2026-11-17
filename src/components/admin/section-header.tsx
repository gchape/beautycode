import type { ReactNode } from "react";

export function AdminSectionHeader({
	title,
	description,
	children,
}: {
	title: string;
	description: string;
	children?: ReactNode;
}) {
	return (
		<div className="my-4 flex flex-wrap items-center justify-between gap-4">
			<div className="min-w-0">
				<h2 className="m-0 text-subheading font-semibold">{title}</h2>
				<p className="mt-1 mb-0 max-w-prose text-sm text-muted-foreground">
					{description}
				</p>
			</div>
			{children}
		</div>
	);
}
