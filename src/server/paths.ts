export function databasePath() {
	return (
		process.env.DB_PATH ||
		(process.env.NODE_ENV === "development"
			? "data-dev/beautycode.db"
			: "data/beautycode.db")
	);
}
