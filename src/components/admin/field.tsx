import { cloneElement, type ReactElement, useId } from "react";

export function Field({
	label,
	hint,
	className = "",
	children,
}: {
	label: string;
	hint?: string;
	className?: string;
	children: ReactElement<{
		id?: string;
		required?: boolean;
		"aria-describedby"?: string;
	}>;
}) {
	const id = useId();
	const describedBy =
		[children.props["aria-describedby"], hint ? `${id}-hint` : ""]
			.filter(Boolean)
			.join(" ") || undefined;
	return (
		<div className={`flex min-w-0 flex-col gap-2 text-sm ${className}`}>
			<label htmlFor={id} className="font-medium leading-relaxed">
				{label}
				{children.props.required && (
					<>
						<span aria-hidden="true" className="ml-1 text-ring">
							*
						</span>
						<span className="sr-only"> (აუცილებელი)</span>
					</>
				)}
			</label>
			{cloneElement(children, { id, "aria-describedby": describedBy })}
			{hint && (
				<p
					id={`${id}-hint`}
					className="m-0 text-[0.8125rem] leading-relaxed text-muted-foreground"
				>
					{hint}
				</p>
			)}
		</div>
	);
}
