import { useLocation } from "@tanstack/react-router";
import { LoaderCircle, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";
import { Label } from "../ui/label.tsx";

export function CatalogSearchForm({
	defaultValue,
	onSearch,
	pending = false,
}: {
	defaultValue: string;
	onSearch: (query?: string) => void;
	pending?: boolean;
}) {
	const [query, setQuery] = useState(defaultValue);
	const input = useRef<HTMLInputElement>(null);
	const hash = useLocation({ select: (location) => location.hash });
	useEffect(() => {
		if (hash === "search") input.current?.focus({ preventScroll: true });
	}, [hash]);
	return (
		<search>
			<form
				className="mb-6 flex items-center gap-3.75 rounded-lg border border-border p-1.75 pl-5 max-[560px]:gap-2 max-[560px]:pl-3"
				onSubmit={(e) => {
					e.preventDefault();
					onSearch(query.trim() || undefined);
				}}
			>
				<Label className="sr-only" htmlFor="search">
					პროდუქტის ძებნა
				</Label>
				<Search size={20} className="shrink-0" aria-hidden="true" />
				<Input
					className="h-auto min-w-0 flex-1 border-0 bg-transparent p-2.5 text-[length:inherit] shadow-none outline-offset-0 md:text-[length:inherit]"
					id="search"
					ref={input}
					enterKeyHint="search"
					type="search"
					autoComplete="off"
					placeholder="მაგ. ეპილატორი"
					value={query}
					maxLength={200}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Button
					className="max-[560px]:px-3.75 max-[560px]:py-2.5"
					type="submit"
					disabled={pending}
					aria-busy={pending}
				>
					{pending && (
						<LoaderCircle
							size={18}
							className="motion-safe:animate-spin"
							aria-hidden="true"
						/>
					)}
					ძებნა
				</Button>
			</form>
		</search>
	);
}
