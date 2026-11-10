import { z } from "zod";

const optionalNonEmpty = z.string().trim().min(1).optional();

export const serverEnvironmentSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).optional(),
	HOST: optionalNonEmpty,
	PORT: z.coerce.number().int().min(1).max(65535).default(3000),
	DB_PATH: optionalNonEmpty,
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
	CLOUDINARY_CLOUD_NAME: optionalNonEmpty,
	CLOUDINARY_API_KEY: optionalNonEmpty,
	CLOUDINARY_API_SECRET: optionalNonEmpty,
	MIGRATIONS_DIR: optionalNonEmpty,
});

const productionEnvironmentSchema = serverEnvironmentSchema
	.required({
		DB_PATH: true,
		SITE_URL: true,
		AWS_REGION: true,
		S3_BACKUPS_BUCKET: true,
		CLOUDINARY_CLOUD_NAME: true,
		CLOUDINARY_API_KEY: true,
		CLOUDINARY_API_SECRET: true,
	})
	.extend({ NODE_ENV: z.literal("production") });

export type ServerEnvironment = z.infer<typeof serverEnvironmentSchema>;
export type ProductionServerEnvironment = z.infer<
	typeof productionEnvironmentSchema
>;

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

	const parsed = productionEnvironmentSchema.safeParse(env);
	if (!parsed.success)
		throw new Error(
			`Missing required production environment variables: ${parsed.error.issues.map((issue) => issue.path.join(".")).join(", ")}`,
		);
	return parsed.data;
}

export const isDevelopment = () =>
	readServerEnvironment().NODE_ENV === "development";

export const databasePath = () => {
	const env = readServerEnvironment();
	return (
		env.DB_PATH ||
		(env.NODE_ENV === "development"
			? "data-dev/beautycode.db"
			: "data/beautycode.db")
	);
};
