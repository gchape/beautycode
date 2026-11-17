import { useLocation } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";
import { Label } from "../ui/label.tsx";
import { LoadingSpinner } from "../ui/loading-spinner.tsx";

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
	useEffect(() => setQuery(defaultValue), [defaultValue]);
	const hash = useLocation({ select: (location) => location.hash });
	useEffect(() => {
		if (hash === "search") input.current?.focus({ preventScroll: true });
	}, [hash]);
	return (
		<search>
			<form
				className="catalog-toolbar group mb-3 flex items-center gap-2 p-2 pl-3 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/15 sm:mb-4"
				onSubmit={(e) => {
					e.preventDefault();
					onSearch(query.trim() || undefined);
				}}
			>
				<Label className="sr-only" htmlFor="search">
					პროდუქტის ძებნა
				</Label>
				<Search
					size={18}
					strokeWidth={1.5}
					className="shrink-0 text-[#a17687] group-focus-within:text-primary"
					aria-hidden="true"
				/>
				<Input
					className="h-11 min-w-0 flex-1 appearance-none border-0 bg-transparent px-1 py-0 sm:py-0 shadow-none focus-visible:outline-none focus-visible:ring-0"
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
					className="relative h-11 min-h-11 gap-2 px-6 py-0 text-sm whitespace-nowrap"
					type="submit"
					disabled={pending}
					aria-busy={pending}
				>
					<span className="absolute left-2 inline-flex" aria-hidden="true">
						{pending && <LoadingSpinner size={14} />}
					</span>
					ძებნა
				</Button>
			</form>
		</search>
	);
}
