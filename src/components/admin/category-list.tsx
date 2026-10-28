import type { Category } from "../../data/catalog.ts";
import { Button } from "../ui/button.tsx";

export function CategoryList({
	categories,
	onEdit,
}: {
	categories: Category[];
	onEdit?: (category: Category) => void;
}) {
	return (
		<div className="admin-table">
			<table>
				<thead>
					<tr>
						<th>კატეგორია</th>
						<th>რიგითობა</th>
						<th>ხილვადობა</th>
						{onEdit && <th>მოქმედება</th>}
					</tr>
				</thead>
				<tbody>
					{categories.map((c) => (
						<tr key={c.slug}>
							<td>{c.name}</td>
							<td>{c.sort_order}</td>
							<td>{c.is_active ? "აქტიური" : "დამალული"}</td>
							{onEdit && (
								<td>
									<Button variant="outline" onClick={() => onEdit(c)}>
										რედაქტირება
									</Button>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
