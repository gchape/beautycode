import { useState } from "react";
import type { Category, Product } from "../../data/catalog";
import { finalPrice, money } from "../../data/catalog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
export function ProductList({
	products,
	categories,
	onEdit,
}: {
	products: Product[];
	categories: Category[];
	onEdit: (product: Product) => void;
}) {
	const [query, setQuery] = useState("");
	const [status, setStatus] = useState("");
	const [category, setCategory] = useState("");
	const rows = products.filter(
		(p) =>
			(!status || p.status === status) &&
			(!category || p.category_slug === category) &&
			`${p.name} ${p.sku || ""}`.toLowerCase().includes(query.toLowerCase()),
	);
	const statuses = {
		published: "გამოქვეყნებული",
		draft: "მონახაზი",
		archived: "არქივი",
	};
	return (
		<>
			<div className="admin-actions">
				<Input
					aria-label="პროდუქტის ძებნა"
					placeholder="დასახელება ან კოდი"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<select
					aria-label="სტატუსით გაფილტვრა"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>
					<option value="">ყველა სტატუსი</option>
					{Object.entries(statuses).map(([value, label]) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</select>
				<select
					aria-label="კატეგორიით გაფილტვრა"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				>
					<option value="">ყველა კატეგორია</option>
					{categories.map((c) => (
						<option key={c.slug} value={c.slug}>
							{c.name}
						</option>
					))}
				</select>
			</div>
			<div className="admin-table">
				<table>
					<thead>
						<tr>
							<th>პროდუქტი</th>
							<th>ფასი</th>
							<th>სტატუსი</th>
							<th>მოქმედება</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((p) => (
							<tr key={p.id}>
								<td>
									{p.name}
									{p.is_featured ? " ★" : ""}
								</td>
								<td>{money(finalPrice(p))}</td>
								<td>{statuses[p.status || "draft"]}</td>
								<td>
									<Button variant="outline" onClick={() => onEdit(p)}>
										რედაქტირება
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{!rows.length && <p>პროდუქტი ვერ მოიძებნა.</p>}
			</div>
		</>
	);
}
