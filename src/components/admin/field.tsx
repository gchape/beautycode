import { cloneElement, type ReactElement, useId } from "react";
import { Checkbox } from "../ui/checkbox.tsx";
import { Label } from "../ui/label.tsx";

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
	const generatedId = useId();
	const id = children.props.id ?? generatedId;
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

export function CheckboxField({
	label,
	hint,
	name,
	defaultChecked,
}: {
	label: string;
	hint: string;
	name: string;
	defaultChecked?: boolean;
}) {
	const id = useId();
	return (
		<div className="col-span-full flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
			<Checkbox
				id={id}
				name={name}
				defaultChecked={defaultChecked}
				className="mt-3 size-5 rounded-md"
				aria-describedby={`${id}-hint`}
			/>
			<div className="min-w-0">
				<Label htmlFor={id} className="min-h-11 leading-relaxed">
					{label}
				</Label>
				<p
					id={`${id}-hint`}
					className="m-0 text-sm leading-relaxed text-muted-foreground"
				>
					{hint}
				</p>
			</div>
		</div>
	);
}
