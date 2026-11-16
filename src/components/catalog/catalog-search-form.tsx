import { useLocation } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "../motion/loading-spinner.tsx";
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
				className="group mb-3 flex items-center gap-2 rounded-full border border-[#dfcbd3] bg-linear-to-br from-white to-[#f7edf1] p-2 shadow-[0_4px_16px_#63303e0d,inset_0_1px_0_#ffffff] focus-within:border-[#b8889b] focus-within:shadow-[0_4px_20px_#63303e14,0_0_0_3px_#63303e0a] sm:mb-4 sm:gap-3"
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
					className="h-11 min-w-0 flex-1 appearance-none rounded-full border-0 bg-transparent px-2.5 py-0 text-sm shadow-none placeholder:text-muted-foreground/65 focus-visible:outline-none focus-visible:ring-0 sm:px-3"
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
					className="h-11 min-h-11 gap-2 rounded-full border-white/15 bg-linear-to-br from-[#63303e] to-primary px-4 py-0 text-[0.8125rem] whitespace-nowrap shadow-[0_2px_6px_#2e000326,inset_0_1px_0_#ffffff26] hover:from-[#754052] hover:to-[#481421] sm:px-6 sm:text-sm"
					type="submit"
					disabled={pending}
					aria-busy={pending}
				>
					{pending && <LoadingSpinner />}
					ძებნა
				</Button>
			</form>
		</search>
	);
}
