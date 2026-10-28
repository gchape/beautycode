export interface AuditEntry {
	id: number;
	username: string;
	action: string;
	entity: string;
	entity_id: string;
	created_at: string;
}

export function AuditLog({
	entries,
	pending,
}: {
	entries: AuditEntry[];
	pending: boolean;
}) {
	return (
		<div className="admin-table">
			<table>
				<thead>
					<tr>
						<th>თარიღი</th>
						<th>მომხმარებელი</th>
						<th>მოქმედება</th>
						<th>ჩანაწერი</th>
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
			{!pending && !entries.length && <p>ცვლილებები ჯერ არ არის.</p>}
		</div>
	);
}
