import { SQL } from "bun";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Create a client (Bun manages pooling internally)
export const db = new SQL(process.env.DATABASE_URL);