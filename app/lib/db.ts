if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
}

// Bun's native SQL client via global Bun (no import)
export const db = Bun.sql(process.env.DATABASE_URL);