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
		<label className="admin-field" htmlFor={id}>
			<span>{label}</span>
			{cloneElement(children, { id })}
		</label>
	);
}
