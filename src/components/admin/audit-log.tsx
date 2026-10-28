import type { AuditEntry } from "../../data/audit.ts";
import { AdminTable } from "./admin-table.tsx";

export function AuditLog({
	entries,
	pending,
}: {
	entries: AuditEntry[];
	pending: boolean;
}) {
	return (
		<AdminTable>
			<table>
				<thead>
					<tr>
						<th scope="col">თარიღი</th>
						<th scope="col">მომხმარებელი</th>
						<th scope="col">მოქმედება</th>
						<th scope="col">ჩანაწერი</th>
					</tr>
				</thead>
				<tbody>
					{entries.map((entry) => (
						<tr key={entry.id}>
							<td>{entry.created_at}</td>
							<td>{entry.username}</td>
							<td>{entry.action}</td>
							<td>
								{entry.entity}: {entry.entity_id}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{!pending && !entries.length && (
				<p className="px-5 py-12 text-center text-sm text-muted-foreground">
					ცვლილებები ჯერ არ არის.
				</p>
			)}
		</AdminTable>
	);
}
