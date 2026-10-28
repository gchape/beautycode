import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function CatalogSearchForm({
	query,
	onQueryChange,
	onSearch,
}: {
	query: string;
	onQueryChange: (value: string) => void;
	onSearch: (query?: string) => void;
}) {
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
				onChange={(e) => onQueryChange(e.target.value)}
			/>
			<Button type="submit">ძებნა</Button>
		</form>
	);
}
