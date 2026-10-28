export interface AuditEntry {
	id: number;
	username: string;
	action: string;
	entity: string;
	entity_id: string;
	created_at: string;
}
