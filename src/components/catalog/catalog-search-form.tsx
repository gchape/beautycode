import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";
import { Label } from "../ui/label.tsx";

export function CatalogSearchForm({
	defaultValue,
	onSearch,
}: {
	defaultValue: string;
	onSearch: (query?: string) => void;
}) {
	const [query, setQuery] = useState(defaultValue);
	return (
		<form
			className="mb-[25px] flex items-center gap-[15px] rounded-lg border border-border p-[7px] pl-5 max-[560px]:gap-2 max-[560px]:pl-3"
			onSubmit={(e) => {
				e.preventDefault();
				onSearch(query || undefined);
			}}
		>
			<Label className="sr-only" htmlFor="search">
				პროდუქტის ძებნა
			</Label>
			<Search size={20} />
			<Input
				className="h-auto min-w-0 flex-1 border-0 bg-transparent p-2.5 text-[length:inherit] shadow-none outline-offset-0 md:text-[length:inherit]"
				id="search"
				placeholder="რას ეძებ?"
				value={query}
				maxLength={200}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<Button
				className="max-[560px]:px-[15px] max-[560px]:py-2.5"
				type="submit"
			>
				ძებნა
			</Button>
		</form>
	);
}
