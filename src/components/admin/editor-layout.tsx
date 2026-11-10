import { ArrowLeft } from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";
import { Button } from "../ui/button.tsx";
import { Card } from "../ui/card.tsx";

export function EditorHeader({
	title,
	backLabel,
	busy,
	onCancel,
	children,
}: {
	title: string;
	backLabel: string;
	busy: boolean;
	onCancel: () => void;
	children?: ReactNode;
}) {
	const heading = useRef<HTMLHeadingElement>(null);
	const focused = useRef(false);
	useEffect(() => {
		// Activity restores effects when returning to a tab; keep focus on the tab.
		if (focused.current) return;
		focused.current = true;
		heading.current?.focus({ preventScroll: true });
		heading.current?.scrollIntoView({ block: "start" });
	}, []);
	return (
		<div className="mb-6 flex flex-wrap items-start justify-between gap-4">
			<div className="flex min-w-0 items-start gap-3">
				<Button
					variant="ghost"
					size="icon-lg"
					disabled={busy}
					onClick={onCancel}
					aria-label={backLabel}
				>
					<ArrowLeft size={18} aria-hidden="true" />
				</Button>
				<div className="min-w-0">
					<h2
						ref={heading}
						tabIndex={-1}
						className="m-0 scroll-mt-6 text-2xl leading-relaxed outline-none"
					>
						{title}
					</h2>
					<p className="mt-1 mb-0 text-sm text-muted-foreground">
						* აუცილებელი ველია.
					</p>
				</div>
			</div>
			{children}
		</div>
	);
}

export function EditorSection({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<Card className="gap-5 p-4 shadow-none sm:p-6">
			<h3 className="m-0 text-lg">{title}</h3>
			{children}
		</Card>
	);
}
