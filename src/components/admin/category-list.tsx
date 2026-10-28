import type { Category } from "../../data/catalog.ts";
import { Button } from "../ui/button.tsx";
import { AdminTable } from "./admin-table.tsx";

export function CategoryList({
	categories,
	onEdit,
}: {
	categories: Category[];
	onEdit?: (category: Category) => void;
}) {
	return (
		<AdminTable>
			<table>
				<thead>
					<tr>
						<th scope="col">კატეგორია</th>
						<th scope="col">რიგითობა</th>
						<th scope="col">ხილვადობა</th>
						{onEdit && <th scope="col">მოქმედება</th>}
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
		</AdminTable>
	);
}
