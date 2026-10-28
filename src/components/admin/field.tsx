import { cloneElement, type ReactElement, useId } from "react";

export function Field({
	label,
	children,
}: {
	label: string;
	children: ReactElement<{ id?: string }>;
}) {
	const id = useId();
	return (
		<div className="flex flex-col gap-2 text-sm">
			<label htmlFor={id}>{label}</label>
			{cloneElement(children, { id })}
		</div>
	);
}
