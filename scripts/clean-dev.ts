import { rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

if (process.env.NODE_ENV === "production") {
	throw new Error("Refusing to remove development data in production mode");
}

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const developmentData = resolve(repositoryRoot, "data-dev");
await rm(developmentData, { recursive: true, force: true });
console.log("Removed the local development database, uploads, and backups.");
