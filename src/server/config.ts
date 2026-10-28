export const isDevelopment = () => process.env.NODE_ENV === "development";

export const databasePath = () => process.env.DB_PATH || "data/beautycode.db";
