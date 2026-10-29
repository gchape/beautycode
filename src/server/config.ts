import { z } from "zod";

const optionalNonEmpty = z.string().trim().min(1).optional();

export const serverEnvironmentSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).optional(),
	HOST: optionalNonEmpty,
	PORT: z.coerce.number().int().min(1).max(65535).default(3000),
	DB_PATH: optionalNonEmpty,
	UPLOADS_DIR: optionalNonEmpty,
	SITE_URL: z
		.string()
		.url()
		.refine(
			(value) =>
				value.startsWith("https://") && new URL(value).origin === value,
			{
				message: "must be an HTTPS URL without a trailing slash",
			},
		)
		.optional(),
	AWS_REGION: optionalNonEmpty,
	S3_BACKUPS_BUCKET: optionalNonEmpty,
	MIGRATIONS_DIR: optionalNonEmpty,
});

export type ServerEnvironment = z.infer<typeof serverEnvironmentSchema>;
export type ProductionServerEnvironment = ServerEnvironment & {
	NODE_ENV: "production";
	DB_PATH: string;
	UPLOADS_DIR: string;
	SITE_URL: string;
	AWS_REGION: string;
	S3_BACKUPS_BUCKET: string;
};

export function readServerEnvironment(
	source: NodeJS.ProcessEnv = process.env,
): ServerEnvironment {
	const parsed = serverEnvironmentSchema.safeParse(source);
	if (!parsed.success) {
		const details = parsed.error.issues
			.map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
			.join("\n");
		throw new Error(`Invalid server environment:\n${details}`);
	}
	return parsed.data;
}

export function validateProductionEnvironment(
	source: NodeJS.ProcessEnv = process.env,
): ServerEnvironment | ProductionServerEnvironment {
	const env = readServerEnvironment(source);
	if (env.NODE_ENV !== "production") return env;

	const required = [
		"DB_PATH",
		"UPLOADS_DIR",
		"SITE_URL",
		"AWS_REGION",
		"S3_BACKUPS_BUCKET",
	] as const;
	const missing = required.filter((key) => !env[key]);
	if (missing.length)
		throw new Error(
			`Missing required production environment variables: ${missing.join(", ")}`,
		);
	return env as ProductionServerEnvironment;
}

export const isDevelopment = () =>
	readServerEnvironment().NODE_ENV === "development";

export const databasePath = () =>
	readServerEnvironment().DB_PATH || "data/beautycode.db";
