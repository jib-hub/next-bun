import "server-only";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Bun provides SQL class on the global Bun object
const SQLClass = (Bun as any).SQL;
export const db = new SQLClass(process.env.DATABASE_URL);