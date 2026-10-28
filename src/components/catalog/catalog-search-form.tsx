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
			className="search-form"
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
				id="search"
				placeholder="რას ეძებ?"
				value={query}
				maxLength={200}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<Button type="submit">ძებნა</Button>
		</form>
	);
}
