import { useState } from "react";
import type { AdminProduct, Category } from "../../data/catalog.ts";
import { finalPrice, money } from "../../data/catalog.ts";
import { statusLabels } from "../../data/labels.ts";
import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";
export function ProductList({
	products,
	categories,
	onEdit,
}: {
	products: AdminProduct[];
	categories: Category[];
	onEdit?: (product: AdminProduct) => void;
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
					{Object.entries(statusLabels).map(([value, label]) => (
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
							{onEdit && <th>მოქმედება</th>}
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
								<td>{statusLabels[p.status || "draft"]}</td>
								{onEdit && (
									<td>
										<Button variant="outline" onClick={() => onEdit(p)}>
											რედაქტირება
										</Button>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
				{!rows.length && <p>პროდუქტი ვერ მოიძებნა.</p>}
			</div>
		</>
	);
}
